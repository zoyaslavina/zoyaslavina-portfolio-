/**
 * Portfolio Website - Interactive Features
 * Vanilla JavaScript, no dependencies
 */

(function() {
  'use strict';

  // ===== Bio Toggle =====
  function initBioToggle() {
    const toggle = document.getElementById('bio-toggle');
    const expanded = document.getElementById('bio-expanded');
    const scrollIndicator = document.getElementById('scroll-indicator');

    if (!toggle || !expanded) return;

    toggle.addEventListener('click', function() {
      const isExpanded = expanded.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isExpanded);
      expanded.setAttribute('aria-hidden', !isExpanded);
      toggle.textContent = isExpanded ? 'Read less' : 'Read more';

      // Show/hide scroll indicator
      if (scrollIndicator) {
        scrollIndicator.classList.toggle('visible', isExpanded);
      }

      // Reset scroll position when collapsing
      if (!isExpanded) {
        expanded.scrollTop = 0;
      }
    });

    // Hide indicator when scrolled near bottom
    if (expanded && scrollIndicator) {
      expanded.addEventListener('scroll', function() {
        const isNearBottom = expanded.scrollHeight - expanded.scrollTop <= expanded.clientHeight + 50;
        scrollIndicator.classList.toggle('visible', !isNearBottom && expanded.classList.contains('active'));
      });
    }
  }

  // ===== Smooth Scroll for Navigation =====
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);

          if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Update URL without triggering scroll
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  // ===== Intersection Observer for Keyword Highlights =====
  function initHighlightObserver() {
    const highlights = document.querySelectorAll('[data-highlight]');

    if (!highlights.length || !('IntersectionObserver' in window)) return;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const highlightObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Add pulse animation class
          entry.target.classList.add('pulse');

          // Remove observer after animation (one-time only)
          highlightObserver.unobserve(entry.target);

          // Remove class after animation completes
          setTimeout(function() {
            entry.target.classList.remove('pulse');
          }, 600);
        }
      });
    }, observerOptions);

    highlights.forEach(function(highlight) {
      highlightObserver.observe(highlight);
    });
  }

  // ===== Intersection Observer for Section Animations =====
  function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');

    if (!sections.length || !('IntersectionObserver' in window)) return;

    // Add initial state
    sections.forEach(function(section) {
      if (!section.classList.contains('hero')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    });

    const sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(function(section) {
      if (!section.classList.contains('hero')) {
        sectionObserver.observe(section);
      }
    });
  }

  // ===== Timeline Bar Click to Expand =====
  function initTimelineBarClicks() {
    const bars = document.querySelectorAll('.duration-bar[data-id]');
    const wrapper = document.getElementById('timeline-wrapper');

    if (!bars.length) return;

    // Function to position popup within bounds
    function positionPopup(bar) {
      const popup = bar.querySelector('.timeline-popup');
      if (!popup || !wrapper) return;

      // Reset all alignment classes
      popup.classList.remove('align-left', 'align-right', 'align-top');

      // Get dimensions after a brief delay to ensure popup is visible
      requestAnimationFrame(function() {
        const barRect = bar.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        const popupWidth = 280; // popup width from CSS
        const popupHeight = 200; // approximate popup height

        // Check horizontal overflow
        const barCenter = barRect.left + (barRect.width / 2);
        const popupLeft = barCenter - (popupWidth / 2);
        const popupRight = barCenter + (popupWidth / 2);

        if (popupLeft < wrapperRect.left + 10) {
          popup.classList.add('align-left');
        } else if (popupRight > wrapperRect.right - 10) {
          popup.classList.add('align-right');
        }

        // Check vertical overflow - if popup would go below wrapper, open upward
        const spaceBelow = wrapperRect.bottom - barRect.bottom;
        if (spaceBelow < popupHeight + 30) {
          popup.classList.add('align-top');
        }
      });
    }

    // Click handler for bars
    bars.forEach(function(bar) {
      bar.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = this.classList.contains('active');

        // Close all other popups and reset their alignment
        bars.forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-expanded', 'false');
          var popup = b.querySelector('.timeline-popup');
          if (popup) {
            popup.classList.remove('align-left', 'align-right', 'align-top');
          }
        });

        // Toggle this one
        if (!isActive) {
          this.classList.add('active');
          this.setAttribute('aria-expanded', 'true');
          positionPopup(this);
        }
      });

      // Keyboard support
      bar.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
        if (e.key === 'Escape') {
          this.classList.remove('active');
          this.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close button handler
    const closeButtons = document.querySelectorAll('.popup-close');
    closeButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const bar = this.closest('.duration-bar');
        if (bar) {
          bar.classList.remove('active');
          bar.setAttribute('aria-expanded', 'false');
          var popup = bar.querySelector('.timeline-popup');
          if (popup) {
            popup.classList.remove('align-left', 'align-right', 'align-top');
          }
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.duration-bar')) {
        bars.forEach(function(bar) {
          bar.classList.remove('active');
          bar.setAttribute('aria-expanded', 'false');
          var popup = bar.querySelector('.timeline-popup');
          if (popup) {
            popup.classList.remove('align-left', 'align-right', 'align-top');
          }
        });
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        bars.forEach(function(bar) {
          bar.classList.remove('active');
          bar.setAttribute('aria-expanded', 'false');
          var popup = bar.querySelector('.timeline-popup');
          if (popup) {
            popup.classList.remove('align-left', 'align-right', 'align-top');
          }
        });
      }
    });

    // Reposition popup on scroll
    if (wrapper) {
      wrapper.addEventListener('scroll', function() {
        var activeBar = document.querySelector('.duration-bar.active');
        if (activeBar) {
          positionPopup(activeBar);
        }
      });
    }
  }

  // ===== Timeline Bar Staggered Animation =====
  function initTimelineAnimation() {
    const bars = document.querySelectorAll('.duration-bar');

    if (!bars.length || !('IntersectionObserver' in window)) return;

    // Add initial state - use translateX instead of scaleX to avoid distorting content
    bars.forEach(function(bar) {
      bar.style.opacity = '0';
      bar.style.transform = 'translateX(-20px)';
      bar.style.transition = 'opacity 0.4s ease, transform 0.5s ease';
    });

    const timelineObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.duration-bar');
          bars.forEach(function(bar, index) {
            setTimeout(function() {
              bar.style.opacity = '0.9';
              bar.style.transform = 'translateX(0)';
            }, index * 80);
          });
          timelineObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    const track = document.querySelector('.timeline-track');
    if (track) {
      timelineObserver.observe(track);
    }
  }

  // ===== Active Navigation Highlighting =====
  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

    const navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(function(section) {
      navObserver.observe(section);
    });
  }

  // ===== Keyboard Navigation Enhancement =====
  function initKeyboardNav() {
    // Allow Enter key to activate buttons and links
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && document.activeElement.matches('.bio-toggle, .card-link, .contact-link, .cv-button')) {
        e.preventDefault();
        document.activeElement.click();
      }
    });
  }

  // ===== Timeline Drag-to-Scroll =====
  function initTimelineDrag() {
    const wrapper = document.getElementById('timeline-wrapper');
    if (!wrapper) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let hasDragged = false;

    wrapper.addEventListener('mousedown', function(e) {
      // Ignore if clicking on a link, button, or duration bar
      if (e.target.closest('a, button, .duration-bar')) return;

      isDown = true;
      hasDragged = false;
      wrapper.classList.add('dragging');
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', function() {
      isDown = false;
      wrapper.classList.remove('dragging');
    });

    wrapper.addEventListener('mouseup', function() {
      isDown = false;
      wrapper.classList.remove('dragging');
    });

    wrapper.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      wrapper.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    let touchStartX;
    let touchScrollLeft;

    wrapper.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].pageX - wrapper.offsetLeft;
      touchScrollLeft = wrapper.scrollLeft;
    }, { passive: true });

    wrapper.addEventListener('touchmove', function(e) {
      if (!touchStartX) return;
      const x = e.touches[0].pageX - wrapper.offsetLeft;
      const walk = (x - touchStartX) * 1.5;
      wrapper.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });

    wrapper.addEventListener('touchend', function() {
      touchStartX = null;
    });
  }

  // ===== Reduce Motion Check =====
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // ===== CV Modal =====
  function initCVModal() {
    const cvToggle = document.getElementById('cv-toggle');
    const cvModal = document.getElementById('cv-modal');

    if (!cvToggle || !cvModal) return;

    const cvClose = cvModal.querySelector('.cv-modal-close');
    const cvOverlay = cvModal.querySelector('.cv-modal-overlay');

    function openCVModal() {
      cvModal.classList.add('active');
      cvModal.setAttribute('aria-hidden', 'false');
      cvToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Focus the close button for accessibility
      if (cvClose) cvClose.focus();
    }

    function closeCVModal() {
      cvModal.classList.remove('active');
      cvModal.setAttribute('aria-hidden', 'true');
      cvToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      // Return focus to toggle button
      cvToggle.focus();
    }

    cvToggle.addEventListener('click', openCVModal);

    if (cvClose) {
      cvClose.addEventListener('click', closeCVModal);
    }

    if (cvOverlay) {
      cvOverlay.addEventListener('click', closeCVModal);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && cvModal.classList.contains('active')) {
        closeCVModal();
      }
    });
  }

  // ===== Blog Instant View Modal =====
  function initBlogModals() {
    const blogButtons = document.querySelectorAll('.blog-instant-view');

    blogButtons.forEach(function(button) {
      const blogId = button.getAttribute('data-blog');
      const modalId = 'blog-modal-' + blogId.split('-')[1];
      const modal = document.getElementById(modalId);

      if (!modal) return;

      const closeBtn = modal.querySelector('.blog-modal-close');
      const overlay = modal.querySelector('.blog-modal-overlay');

      function openModal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        button.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.focus();
      }

      function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        button.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        button.focus();
      }

      button.addEventListener('click', openModal);

      if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
      }

      if (overlay) {
        overlay.addEventListener('click', closeModal);
      }

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          closeModal();
        }
      });
    });
  }

  // ===== Initialize All Features =====
  function init() {
    initBioToggle();
    initSmoothScroll();
    initKeyboardNav();
    initTimelineDrag();
    initTimelineBarClicks();
    initCVModal();
    initBlogModals();

    // Only initialize animations if user doesn't prefer reduced motion
    if (!prefersReducedMotion()) {
      initHighlightObserver();
      initSectionAnimations();
      initTimelineAnimation();
    }

    initActiveNavHighlight();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
