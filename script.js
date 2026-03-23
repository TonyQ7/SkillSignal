/* ═══════════════════════════════════════════════════
   SKILLSIGNAL — Interactions v2
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll-reveal with IntersectionObserver ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ── Animated counters (stat cards, big stats, signal metric) ──
  const counterElements = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counterElements.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 1600;
    const startTime = performance.now();

    // Determine default suffix based on context
    const hasNoSuffix = !suffix && !isDecimal;
    const defaultSuffix = hasNoSuffix && el.textContent.includes('%') ? '%' : '';

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;

      if (isDecimal) {
        el.textContent = current.toFixed(1) + suffix;
      } else if (suffix) {
        el.textContent = Math.round(current) + suffix;
      } else {
        el.textContent = Math.round(current) + defaultSuffix;
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }


  // ── Score bars animate on reveal ──
  const scoreBars = document.querySelectorAll('.score-bar__fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 300);
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  scoreBars.forEach(bar => barObserver.observe(bar));


  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ── Nav opacity on scroll ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(10, 10, 12, 0.92)';
    } else {
      nav.style.background = 'rgba(10, 10, 12, 0.65)';
    }
  }, { passive: true });

});
