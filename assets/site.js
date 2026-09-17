const body = document.body;
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-list a');

if (window.location.pathname.endsWith('/index.html')) {
  window.history.replaceState(null, '', `${window.location.pathname.replace(/index\.html$/, '')}${window.location.search}${window.location.hash}`);
}

document.querySelectorAll('a[href="index.html"]').forEach((link) => {
  link.setAttribute('href', './');
});

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
};

toggle?.addEventListener('click', () => {
  const open = body.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  body.classList.remove('menu-open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
