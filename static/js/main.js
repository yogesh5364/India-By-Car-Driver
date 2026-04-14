/* =============================================
   MAIN.JS — Scroll, Navbar, Counters, Back-top
   India by Car Driver
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');
    const backTop = document.getElementById('back-top');
    if (backTop) {
      if (window.scrollY > 400) backTop.classList.add('show');
      else backTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── BACK TO TOP ─── */
  document.getElementById('back-top')?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ─── MOBILE NAV TOGGLE ─── */
  const navToggle = document.getElementById('nav-toggle');
  const navDrawer = document.getElementById('nav-drawer');
  navToggle?.addEventListener('click', () => {
    const open = navDrawer.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!navbar?.contains(e.target) && !navDrawer?.contains(e.target)) {
      navDrawer?.classList.remove('open');
      navToggle?.classList.remove('open');
    }
  });

  /* ─── SCROLL REVEAL ─── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  /* ─── COUNT-UP ─── */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current = Math.min(current + step, target);
          el.textContent = (current >= 1000
            ? (current / 1000).toFixed(current >= 10000 ? 0 : 1) + 'K'
            : Math.round(current).toString()) + suffix;
          if (current < target) requestAnimationFrame(update);
          else el.textContent = (target >= 1000
            ? (target / 1000).toFixed(target >= 10000 ? 0 : 1) + 'K'
            : target.toString()) + suffix;
        };
        requestAnimationFrame(update);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => countObserver.observe(el));

  /* ─── POPUP CLOSE ─── */
  document.querySelectorAll('[data-close-popup]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.closePopup;
      document.getElementById(id)?.classList.remove('open');
    });
  });
  document.querySelectorAll('.popup-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  /* ─── PACKAGE TABS ─── */
  const tabs = document.querySelectorAll('.pkg-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      // Filter logic — simple show/hide by data-region
      const filter = tab.dataset.filter;
      document.querySelectorAll('.pkg-card').forEach((card) => {
        if (filter === 'all' || card.dataset.region === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

});