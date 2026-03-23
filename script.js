/* ═══════════════════════════════════════════════════
   SKILLSIGNAL — Interactions
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
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ── Animated stat counters ──
  const counterElements = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out expo
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;

      if (isDecimal) {
        el.textContent = current.toFixed(1) + suffix;
      } else if (suffix) {
        el.textContent = Math.round(current) + suffix;
      } else {
        el.textContent = Math.round(current) + '%';
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
        }, 200);
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

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

  // ── "See how it works" button scrolls to #solution ──
  const ctaBtn = document.querySelector('.hero .btn-primary');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      const solution = document.getElementById('solution');
      if (solution) {
        solution.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }


  // ── Nav background on scroll ──
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      nav.style.background = 'rgba(10, 10, 12, 0.92)';
    } else {
      nav.style.background = 'rgba(10, 10, 12, 0.7)';
    }
    lastScroll = scrollY;
  }, { passive: true });

});
