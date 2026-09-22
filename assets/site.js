const body = document.body;
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-list a');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = Boolean(window.gsap) && !prefersReducedMotion;

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

if (hasGsap) {
  const heroItems = document.querySelectorAll('.home-hero .eyebrow, .home-hero .hero-title, .home-hero .hero-copy, .home-hero .hero-index, .page-hero .page-kicker, .page-hero .page-title, .page-hero .page-lead');
  window.gsap.from(heroItems, {
    autoAlpha: 0,
    y: 28,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.11,
    delay: 0.12,
  });

  window.gsap.from([document.querySelector('.wordmark'), ...document.querySelectorAll('.nav-list li')].filter(Boolean), {
    autoAlpha: 0,
    y: -12,
    duration: 0.65,
    ease: 'power2.out',
    stagger: 0.07,
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (hasGsap) {
        window.gsap.to(entry.target, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          overwrite: true,
        });

        if (entry.target.classList.contains('solution-grid')) {
          window.gsap.from(entry.target.querySelectorAll('.solution-card'), {
            autoAlpha: 0,
            y: 22,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.08,
            delay: 0.12,
            overwrite: true,
          });
        }
      } else {
        entry.target.classList.add('revealed');
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

const revealTargets = document.querySelectorAll('[data-reveal]');
if (hasGsap) {
  window.gsap.set(revealTargets, { autoAlpha: 0, y: 30 });
}
revealTargets.forEach((el) => observer.observe(el));

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
