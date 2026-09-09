// InFrame Interactive Client Scripts & Navigation Manager
(() => {
  'use strict';

  // Form Validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      },
      false
    );
  });

  // Active Navigation Detector & Outline/Fill Manager
  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.sidebar-link[data-nav]');

    let activeFound = false;
    navLinks.forEach((link) => {
      const navType = link.getAttribute('data-nav');
      if (navType === 'home' && (path.includes('/home') || path === '/')) {
        link.classList.add('active');
        activeFound = true;
      } else if (navType === 'notifications' && path.includes('/notification')) {
        link.classList.add('active');
        activeFound = true;
      } else if (navType === 'messages' && path.includes('/message')) {
        link.classList.add('active');
        activeFound = true;
      } else if (
        navType === 'profile' &&
        path.length > 1 &&
        !path.includes('/home') &&
        !path.includes('/message') &&
        !path.includes('/notification') &&
        !path.includes('/new') &&
        !path.includes('/user')
      ) {
        link.classList.add('active');
        activeFound = true;
      }
    });

    if (!activeFound) {
      const homeLink = document.querySelector('.mobile-nav-home');
      if (homeLink) homeLink.classList.add('active');
    }

    // Feed Card Interactive Actions (Like, Bookmark, Double-Tap Like)
    document.querySelectorAll('.feed-card').forEach((card) => {
      const heartBtn = card.querySelector('.feed-action-btn:has(.bi-heart, .bi-heart-fill)');
      const saveBtn = card.querySelector('.feed-action-btn:has(.bi-bookmark, .bi-bookmark-fill)');
      const mediaImg = card.querySelector('.feed-card-media img');

      if (heartBtn) {
        heartBtn.addEventListener('click', () => {
          const heartIcon = heartBtn.querySelector('i');
          if (heartIcon.classList.contains('bi-heart')) {
            heartIcon.className = 'bi bi-heart-fill text-danger';
            heartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => (heartBtn.style.transform = 'scale(1)'), 180);
          } else {
            heartIcon.className = 'bi bi-heart';
            heartIcon.style.color = '';
          }
        });
      }

      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          const saveIcon = saveBtn.querySelector('i');
          if (saveIcon.classList.contains('bi-bookmark')) {
            saveIcon.className = 'bi bi-bookmark-fill';
          } else {
            saveIcon.className = 'bi bi-bookmark';
          }
        });
      }

      if (mediaImg) {
        let lastTap = 0;
        mediaImg.addEventListener('touchend', () => {
          const currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;
          if (tapLength < 300 && tapLength > 0) {
            if (heartBtn) {
              const heartIcon = heartBtn.querySelector('i');
              heartIcon.className = 'bi bi-heart-fill text-danger';
              heartBtn.style.transform = 'scale(1.25)';
              setTimeout(() => (heartBtn.style.transform = 'scale(1)'), 200);
            }
          }
          lastTap = currentTime;
        });
      }
    });
  });
})();

