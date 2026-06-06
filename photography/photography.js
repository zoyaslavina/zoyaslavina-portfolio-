(function () {
  'use strict';

  var GALLERY_SIZE = 14;
  var currentIndex = 0;
  var activePhotos = [];

  var LAYOUT_PATTERN = [
    { col: '1/3' },  // 0  wide left pair
    { col: '3/5' },  // 1  wide right pair
    { col: '1/5' },  // 2  SOLO full-width
    { col: '1/2' },  // 3  narrow (natural proportions)
    { col: '2/4' },  // 4  wide mid
    { col: '4/5' },  // 5  narrow (natural proportions)
    { col: '1/5' },  // 6  SOLO full-width
    { col: '1/3' },  // 7  wide left pair
    { col: '3/5' },  // 8  wide right pair
    { col: '1/5' },  // 9  SOLO full-width
    { col: '1/2' },  // 10 narrow
    { col: '2/4' },  // 11 wide mid
    { col: '4/5' },  // 12 narrow
    { col: '1/5' },  // 13 SOLO full-width closing
  ];

  // Preferred orientation per slot: L=landscape, P=portrait, A=any (full-width)
  var SLOT_PREFS = ['L','L','A','P','L','P','A','L','L','A','P','L','P','A'];

  // ============================================================
  // Rotation: pick GALLERY_SIZE photos deterministically by date
  // ============================================================

  function getCurrentPeriod() {
    // Changes daily at UTC midnight
    return Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  }

  function seededShuffle(array, seed) {
    var result = array.slice();
    var s = seed;
    for (var i = result.length - 1; i > 0; i--) {
      // Linear congruential generator
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      var j = Math.abs(s) % (i + 1);
      var tmp = result[i]; result[i] = result[j]; result[j] = tmp;
    }
    return result;
  }

  function selectPhotosForPeriod(allPhotos, count) {
    var period = getCurrentPeriod();
    var shuffled = seededShuffle(allPhotos, period);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  // ============================================================
  // Grid builder
  // ============================================================

  // ============================================================
  // Pre-arrange photos to fit slot orientations
  // ============================================================

  function preloadOrientations(photos, callback) {
    var orientations = new Array(photos.length);
    var remaining = photos.length;
    if (!remaining) { callback(orientations); return; }

    photos.forEach(function (photo, i) {
      var img = new Image();
      function done() {
        orientations[i] = img.naturalHeight > img.naturalWidth ? 'P' : 'L';
        photo.isPortrait = orientations[i] === 'P';
        if (--remaining === 0) callback(orientations);
      }
      img.onload = done;
      img.onerror = done;
      img.src = photo.thumb || photo.src || photo.full;
    });
  }

  function rearrangeForSlots(photos, orientations) {
    var landscapes = [], portraits = [];
    photos.forEach(function (p, i) {
      if (orientations[i] === 'P') portraits.push(p);
      else landscapes.push(p);
    });

    var li = 0, pi = 0, result = [];
    SLOT_PREFS.forEach(function (pref) {
      var photo;
      if (pref === 'P') {
        photo = pi < portraits.length  ? portraits[pi++]
              : li < landscapes.length ? landscapes[li++] : null;
      } else if (pref === 'L') {
        photo = li < landscapes.length ? landscapes[li++]
              : pi < portraits.length  ? portraits[pi++]  : null;
      } else {
        var lRem = landscapes.length - li, pRem = portraits.length - pi;
        photo = (lRem >= pRem && li < landscapes.length) ? landscapes[li++]
              : (pi < portraits.length)                   ? portraits[pi++]
              : null;
      }
      if (photo) result.push(photo);
    });
    return result;
  }

  // ============================================================
  // Portrait-pair optimisation (runs after all images load)
  // ============================================================

  function optimizeTrios(photos, grid) {
    var items = Array.from(grid.querySelectorAll('.photo-item'));

    [[3, 4, 5], [10, 11, 12]].forEach(function (trio) {
      var li = trio[0], mi = trio[1], ri = trio[2];
      if (ri >= items.length) return;

      if (photos[li] && photos[li].isPortrait && photos[ri] && photos[ri].isPortrait) {
        // Both narrow slots portrait → enlarge to 2 cols each, middle goes full-width below
        items[li].style.gridColumn = '1/3';
        items[ri].style.gridColumn = '3/5';
        items[mi].style.gridColumn = '1/5';
        // Reorder DOM so portraits appear first (fill their row), middle follows
        items[li].parentNode.insertBefore(items[mi], items[ri].nextSibling);
      }
    });
  }

  // ============================================================
  // Like system
  // ============================================================

  var MAX_DAILY_LIKES = 3;

  function getDayKey() {
    return Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  }

  function getPhotoId(photo) {
    var src = photo.thumb || photo.full;
    return src.replace(/^.*\//, '').replace(/\.[^.]+$/, '');
  }

  function loadLikesState() {
    var dayKey = getDayKey();
    var liked = [], counts = {};
    try {
      liked  = JSON.parse(localStorage.getItem('gallery_liked_' + dayKey) || '[]');
      counts = JSON.parse(localStorage.getItem('gallery_like_counts') || '{}');
    } catch (e) {}
    return { liked: liked, counts: counts, dayKey: dayKey };
  }

  function saveLikesState(state) {
    try {
      localStorage.setItem('gallery_liked_' + state.dayKey, JSON.stringify(state.liked));
      localStorage.setItem('gallery_like_counts', JSON.stringify(state.counts));
    } catch (e) {}
  }

  function updateLikesUI(state, photos) {
    var used = state.liked.length;
    var remaining = MAX_DAILY_LIKES - used;

    var counter = document.getElementById('likes-counter');
    if (counter) counter.textContent = used + ' / ' + MAX_DAILY_LIKES + ' likes used today';

    for (var i = 0; i < MAX_DAILY_LIKES; i++) {
      var pip = document.getElementById('like-pip-' + i);
      if (pip) pip.classList.toggle('used', i < used);
    }

    var note = document.getElementById('exhausted-note');
    if (note) note.classList.toggle('visible', used >= MAX_DAILY_LIKES);

    photos.forEach(function (photo) {
      var id = getPhotoId(photo);
      var btn = document.querySelector('[data-like-id="' + id + '"]');
      if (!btn) return;

      var isLiked = state.liked.indexOf(id) !== -1;
      btn.classList.toggle('liked', isLiked);
      btn.setAttribute('aria-pressed', isLiked ? 'true' : 'false');
      btn.disabled = !isLiked && used >= MAX_DAILY_LIKES;

      var countEl = btn.querySelector('.like-count');
      if (countEl) countEl.textContent = state.counts[id] || 0;

      var tip = btn.querySelector('.like-tooltip');
      if (tip) {
        if (isLiked) tip.textContent = 'Click to undo';
        else if (remaining <= 0) tip.textContent = 'Undo one to free up';
        else tip.textContent = remaining === 1 ? '1 like left today' : remaining + ' likes left today';
      }
    });
  }

  function handleLike(photoId, photos) {
    var state = loadLikesState();
    var isLiked = state.liked.indexOf(photoId) !== -1;
    if (isLiked) {
      state.liked = state.liked.filter(function (id) { return id !== photoId; });
      state.counts[photoId] = Math.max(0, (state.counts[photoId] || 1) - 1);
    } else {
      if (state.liked.length >= MAX_DAILY_LIKES) return;
      state.liked.push(photoId);
      state.counts[photoId] = (state.counts[photoId] || 0) + 1;
    }
    saveLikesState(state);
    updateLikesUI(state, photos);
  }

  function initLikeSystem(photos) {
    var state = loadLikesState();
    photos.forEach(function (photo) {
      var id = getPhotoId(photo);
      if (!state.counts[id]) state.counts[id] = 0;
    });
    saveLikesState(state);

    photos.forEach(function (photo) {
      var id = getPhotoId(photo);
      var btn = document.querySelector('[data-like-id="' + id + '"]');
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        handleLike(id, photos);
      });
    });

    updateLikesUI(state, photos);
  }

  // ============================================================
  // Grid builder
  // ============================================================

  function buildGrid(photos) {
    var grid = document.getElementById('photo-grid');
    if (!grid) return;

    if (!photos || !photos.length) {
      var msg = document.createElement('p');
      msg.className = 'gallery-empty-msg';
      msg.textContent = 'Photos coming soon.';
      grid.appendChild(msg);
      return;
    }

    photos.forEach(function (photo, index) {
      var config = LAYOUT_PATTERN[index] || LAYOUT_PATTERN[0];

      var item = document.createElement('figure');
      item.className = 'photo-item';
      item.style.gridColumn = config.col;
      item.setAttribute('role', 'listitem');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', photo.alt || ('Photo ' + (index + 1)));
      item.dataset.index = index;

      var wrap = document.createElement('div');
      wrap.className = 'photo-img-wrap';

      var img = document.createElement('img');
      img.className = 'photo-thumb';
      img.src = photo.thumb || photo.src || photo.full;
      img.setAttribute('alt', photo.alt || '');
      img.setAttribute('decoding', 'async');
      img.onload = function () { img.classList.add('loaded'); };

      wrap.appendChild(img);
      item.appendChild(wrap);

      // Caption + like button footer
      var footer = document.createElement('figcaption');
      footer.className = 'photo-card-footer';

      var capSpan = document.createElement('span');
      capSpan.className = 'photo-caption-text';
      capSpan.textContent = photo.caption || '';
      footer.appendChild(capSpan);

      var pid = getPhotoId(photo);
      var likeBtn = document.createElement('button');
      likeBtn.className = 'like-btn';
      likeBtn.dataset.likeId = pid;
      likeBtn.setAttribute('aria-label', 'Like this photo');
      likeBtn.setAttribute('aria-pressed', 'false');

      var svgNS = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      var path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z');
      svg.appendChild(path);

      var countSpan = document.createElement('span');
      countSpan.className = 'like-count';
      countSpan.textContent = '0';

      var tipSpan = document.createElement('span');
      tipSpan.className = 'like-tooltip';
      tipSpan.setAttribute('role', 'tooltip');

      likeBtn.appendChild(svg);
      likeBtn.appendChild(countSpan);
      likeBtn.appendChild(tipSpan);
      footer.appendChild(likeBtn);

      item.appendChild(footer);

      grid.appendChild(item);

      item.addEventListener('click', function () { openLightbox(index); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    // Orientations pre-set by preloadOrientations — run optimisation now
    optimizeTrios(photos, grid);

    // Wire up like system
    initLikeSystem(photos);
  }

  // ============================================================
  // Lazy image loading via IntersectionObserver
  // ============================================================

  function initLazyImages(grid) {
    var imgs = grid.querySelectorAll('img[data-src]');

    if (!('IntersectionObserver' in window)) {
      imgs.forEach(function (img) { img.src = img.dataset.src; });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    imgs.forEach(function (img) { observer.observe(img); });
  }

  // ============================================================
  // Lightbox
  // ============================================================

  function openLightbox(index) {
    currentIndex = index;
    showPhoto(index);

    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    var closeBtn = document.getElementById('lightbox-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    var opener = document.querySelector('.photo-item[data-index="' + currentIndex + '"]');
    if (opener) opener.focus();
  }

  function showPhoto(index) {
    var photo = activePhotos[index];
    if (!photo) return;

    var img     = document.getElementById('lightbox-img');
    var caption = document.getElementById('lightbox-caption');
    var prev    = document.getElementById('lightbox-prev');
    var next    = document.getElementById('lightbox-next');

    if (img) { img.src = photo.full || photo.src || photo.thumb; img.alt = photo.alt || ''; }
    if (caption) caption.textContent = photo.caption || '';
    if (prev) prev.style.visibility = index > 0 ? 'visible' : 'hidden';
    if (next) next.style.visibility = index < activePhotos.length - 1 ? 'visible' : 'hidden';
  }

  function prevPhoto() {
    if (currentIndex > 0) { currentIndex--; showPhoto(currentIndex); }
  }

  function nextPhoto() {
    if (currentIndex < activePhotos.length - 1) { currentIndex++; showPhoto(currentIndex); }
  }

  // ============================================================
  // Keyboard navigation
  // ============================================================

  function initKeyboardNav() {
    document.addEventListener('keydown', function (e) {
      var lightbox = document.getElementById('lightbox');
      if (!lightbox || !lightbox.classList.contains('active')) return;

      if (e.key === 'Escape')      closeLightbox();
      else if (e.key === 'ArrowLeft')  prevPhoto();
      else if (e.key === 'ArrowRight') nextPhoto();
    });
  }

  // ============================================================
  // Touch swipe (mobile)
  // ============================================================

  function initSwipe() {
    var content = document.querySelector('.lightbox-content');
    if (!content) return;

    var startX = 0;
    content.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    content.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) {
        if (dx > 0) prevPhoto();
        else nextPhoto();
      }
    }, { passive: true });
  }

  // ============================================================
  // Lightbox button wiring
  // ============================================================

  function initLightboxButtons() {
    var close   = document.getElementById('lightbox-close');
    var prev    = document.getElementById('lightbox-prev');
    var next    = document.getElementById('lightbox-next');
    var overlay = document.getElementById('lightbox-overlay');

    if (close)   close.addEventListener('click', closeLightbox);
    if (prev)    prev.addEventListener('click', prevPhoto);
    if (next)    next.addEventListener('click', nextPhoto);
    if (overlay) overlay.addEventListener('click', closeLightbox);
  }

  // ============================================================
  // Init
  // ============================================================

  var galleryBuilt = false;

  // Called by script.js when photography mode activates
  window.buildPhotographyGallery = function () {
    if (galleryBuilt) return;
    galleryBuilt = true;
    activePhotos = selectPhotosForPeriod(window.PHOTOS || [], GALLERY_SIZE);

    preloadOrientations(activePhotos, function (orientations) {
      var arranged = rearrangeForSlots(activePhotos, orientations);
      buildGrid(arranged);
    });
  };

  function initScrollHint() {
    var hint = document.getElementById('photo-scroll-hint');
    var galleryEl = document.getElementById('gallery');
    if (!hint || !galleryEl || !('IntersectionObserver' in window)) return;
    var hintObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          hint.classList.add('hidden');
          hintObserver.disconnect();
        }
      });
    }, { threshold: 0.1 });
    hintObserver.observe(galleryEl);
  }

  function init() {
    initLightboxButtons();
    initKeyboardNav();
    initSwipe();
    initScrollHint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
