// Minimal JS for smooth UX: smooth scroll, reveal on scroll, simple parallax
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // IntersectionObserver reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up, .service-card, .expertise-card, .project-card, .client, .cert-card').forEach(el => {
    el.classList.add('fade-up');
    io.observe(el);
  });

  // Simple parallax for hero image
  const hero = document.querySelector('.hero');
  const heroMedia = document.querySelector('.hero-media');
  const heroImg = document.querySelector('.hero-right img');
  if (hero && heroMedia && heroImg) {
    window.addEventListener('scroll', function () {
      const rect = hero.getBoundingClientRect();
      const offset = Math.max(0, -rect.top);
      // slow vertical translate on the hero image
      heroImg.style.transform = `translateY(${offset * 0.12}px)`;
      heroMedia.style.backgroundPosition = `center calc(50% + ${offset * 0.06}px)`;
    }, { passive: true });
  }

  // Light interaction: focus states
  document.querySelectorAll('.btn, a').forEach(el => {
    el.addEventListener('focus', () => el.classList.add('focus'));
    el.addEventListener('blur', () => el.classList.remove('focus'));
  });
});
