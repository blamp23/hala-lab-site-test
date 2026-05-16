(function () {
  'use strict';

  /* ---- NAV SCROLL
     Adds .scrolled class after 60px — triggers blur background in CSS ---- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ---- HAMBURGER / MOBILE MENU ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const navMobile  = document.getElementById('navMobile');
  let menuOpen = false;

  function toggleMenu(open) {
    menuOpen = open;
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    if (open) {
      navMobile.classList.add('open');
      navMobile.removeAttribute('aria-hidden');
      document.body.style.overflow = 'hidden';
    } else {
      navMobile.classList.remove('open');
      navMobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  hamburger.addEventListener('click', () => toggleMenu(!menuOpen));
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  /* ---- ACTIVE NAV HIGHLIGHT
     Uses IntersectionObserver to highlight the nav link for the
     section currently in view. ---- */
  const navLinks   = document.querySelectorAll('.nav-links a');
  const allSections = document.querySelectorAll('section[id], footer[id]');

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  allSections.forEach(s => navObserver.observe(s));

  /* ---- FADE-UP ON SCROLL
     Elements with class .fade-up start invisible (see CSS).
     This observer adds .visible once they enter the viewport. ---- */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObs.unobserve(entry.target); // fires once only
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => fadeObs.observe(el));

  /* ---- SMOOTH SCROLL
     Intercepts clicks on any anchor link (href="#section-id") and
     scrolls smoothly, accounting for the fixed nav height. ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 8;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- SPONSOR CAROUSEL
     Cycles through .sponsor-slide images every 3 seconds.
     Prev/Next buttons also allow manual navigation. ---- */
  const slides      = Array.from(document.querySelectorAll('.sponsor-slide'));
  const dots        = Array.from(document.querySelectorAll('.sponsor-dot'));
  let sponsorIdx    = 0;
  let sponsorTimer;

  function goToSponsor(idx) {
    slides[sponsorIdx].classList.remove('active');
    dots[sponsorIdx].classList.remove('active');
    sponsorIdx = (idx + slides.length) % slides.length;
    slides[sponsorIdx].classList.add('active');
    dots[sponsorIdx].classList.add('active');
  }

  function startSponsorTimer() {
    clearInterval(sponsorTimer);
    sponsorTimer = setInterval(() => goToSponsor(sponsorIdx + 1), 3000);
  }

  if (slides.length > 1) {
    startSponsorTimer();
    document.getElementById('sponsorPrev')?.addEventListener('click', () => {
      goToSponsor(sponsorIdx - 1);
      startSponsorTimer(); // reset timer on manual click
    });
    document.getElementById('sponsorNext')?.addEventListener('click', () => {
      goToSponsor(sponsorIdx + 1);
      startSponsorTimer();
    });
  }

  /* ---- PUBLICATION SPOTLIGHT CAROUSELS
     Each research card has a .card-pub-carousel that rotates every 4s ---- */
  document.querySelectorAll('[data-pub-carousel]').forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('.card-pub-slide'));
    const dots   = Array.from(carousel.querySelectorAll('.card-pub-dot'));
    let idx = 0;

    function goTo(n) {
      slides[idx].classList.remove('active');
      dots[idx].classList.remove('active');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('active');
      dots[idx].classList.add('active');
    }

    dots.forEach(dot => dot.addEventListener('click', () => goTo(parseInt(dot.dataset.idx, 10))));
    setInterval(() => goTo(idx + 1), 4000);
  });

  /* ---- LAB PHOTO GALLERY
     Auto-advances every 5 seconds. Click prev/next arrows or dots to navigate.
     To add photos: see index.html gallery-slide divs. ---- */
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryDots  = Array.from(document.querySelectorAll('[data-gallery-idx]'));
  const gallerySlideCount = galleryDots.length;
  let galleryIdx   = 0;
  let galleryTimer;

  function goToGallery(idx) {
    galleryIdx = (idx + gallerySlideCount) % gallerySlideCount;
    galleryTrack.style.transform = `translateX(-${galleryIdx * 100}%)`;
    galleryDots.forEach((d, i) => d.classList.toggle('active', i === galleryIdx));
  }

  function startGalleryTimer() {
    clearInterval(galleryTimer);
    galleryTimer = setInterval(() => goToGallery(galleryIdx + 1), 5000);
  }

  if (galleryTrack && gallerySlideCount > 1) {
    startGalleryTimer();

    document.getElementById('galleryPrev')?.addEventListener('click', () => {
      goToGallery(galleryIdx - 1);
      startGalleryTimer();
    });
    document.getElementById('galleryNext')?.addEventListener('click', () => {
      goToGallery(galleryIdx + 1);
      startGalleryTimer();
    });
    galleryDots.forEach(dot => {
      dot.addEventListener('click', () => {
        goToGallery(parseInt(dot.dataset.galleryIdx, 10));
        startGalleryTimer();
      });
    });

    /* Touch/swipe support for gallery */
    let touchStartX = 0;
    galleryTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    galleryTrack.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        goToGallery(galleryIdx + (dx < 0 ? 1 : -1));
        startGalleryTimer();
      }
    }, { passive: true });
  }

})();
