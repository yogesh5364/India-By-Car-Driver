  // ── MOBILE MENU ──
const toggle = document.getElementById('nav-toggle');
const drawer = document.getElementById('nav-drawer');

toggle.addEventListener('click', () => {
const isOpen = drawer.classList.toggle('open');
toggle.classList.toggle('open', isOpen);
toggle.setAttribute('aria-expanded', isOpen);
document.body.style.overflow = isOpen ? 'hidden' : '';
});
drawer.querySelectorAll('a').forEach(link => {
link.addEventListener('click', () => {
    drawer.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
});
});
document.addEventListener('click', (e) => {
if (!drawer.contains(e.target) && !toggle.contains(e.target)) {
    drawer.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── BACK TO TOP ──
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
backTop.classList.toggle('show', window.scrollY > 400);
});
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-question').forEach(q => {
q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
});
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));