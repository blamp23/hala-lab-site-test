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

  /* ---- STAT COUNTERS
     Any element with data-target="N" (and optionally data-suffix="+")
     will animate from 0 → N when scrolled into view.
     To add a new counter: <span class="stat-number" data-target="5">0</span> ---- */
  const counters  = document.querySelectorAll('[data-target]');
  const triggered = new WeakSet();

  function runCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1500; // ms
    const t0 = performance.now();

    function tick(now) {
      const p     = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target) + (p >= 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered.has(entry.target)) {
        triggered.add(entry.target);
        runCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObs.observe(c));

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

})();
