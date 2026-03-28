import os
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
import anthropic

load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
ALLOWED_USER_ID = os.getenv("ALLOWED_USER_ID")

client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# Conversation history stored per chat_id
conversation_histories = {}

SYSTEM_PROMPT = (
    "You are a personal AI assistant. "
    "You help with tasks, answer questions, and assist with planning and decisions. "
    "Be concise and direct. More capabilities (purchasing, running code tasks) will be added soon."
)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hi! I'm your personal assistant. How can I help?")


async def clear(update: Update, context: ContextTypes.DEFAULT_TYPE):
    conversation_histories.pop(update.effective_chat.id, None)
    await update.message.reply_text("Conversation cleared.")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.effective_chat.id

    # Restrict to authorized user only
    if ALLOWED_USER_ID and str(chat_id) != ALLOWED_USER_ID:
        await update.message.reply_text("This bot is private.")
        return

    user_message = update.message.text

    if chat_id not in conversation_histories:
        conversation_histories[chat_id] = []

    conversation_histories[chat_id].append({"role": "user", "content": user_message})

    await context.bot.send_chat_action(chat_id=chat_id, action="typing")

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=8096,
        system=SYSTEM_PROMPT,
        messages=conversation_histories[chat_id],
    )

    reply = response.content[0].text

    conversation_histories[chat_id].append({"role": "assistant", "content": reply})

    await update.message.reply_text(reply)


def main():
    app = Application.builder().token(TELEGRAM_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("clear", clear))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    print("Bot is running...")
    app.run_polling()


if __name__ == "__main__":
    main()
