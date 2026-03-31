/**
 * @file
 * Animated particle canvas background for Rocket Rivals.
 *
 * Wrapped in Drupal.behaviors so it integrates correctly
 * with Drupal's JavaScript system and BigPipe/AJAX.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.rrBackground = {
    attach: function (context, settings) {

      // Guard — only inject the canvas once, even if attach() is called
      // multiple times by Drupal's AJAX system.
      if (document.getElementById('bg-canvas')) return;

      // Read saved user preference (default: enabled).
      const bgEnabled = localStorage.getItem('rr_bg_enabled') !== 'false';

      // ── Create and inject the canvas element ──
      const canvas = document.createElement('canvas');
      canvas.id = 'bg-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.prepend(canvas);

      const ctx = canvas.getContext('2d');

      // ── Match canvas size to viewport ──
      function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      // ── Particle colours ──
      const COLORS = [
        'rgba(168, 85,  247,',   /* purple  */
        'rgba(251, 146,  60,',   /* orange  */
        'rgba(255, 215,   0,',   /* gold    */
        'rgba(236,  72, 153,',   /* pink    */
        /* 'rgba(255, 255, 255,'   white   */      // Note: interferes with text readability
      ];

      // ── Build the particle pool ──

      // Reduce particles on mobile to keep CPU/battery reasonable
      const PARTICLE_COUNT = window.innerWidth < 768 ? 35 : 80;
      const particles = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x:     Math.random() * window.innerWidth,
          y:     Math.random() * window.innerHeight,
          r:     0.5 + Math.random() * 2,
          dx:    (Math.random() - 0.5) * 0.3,
          dy:    -0.05 - Math.random() * 0.35,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 0.25 + Math.random() * 0.65,
        });
      }

      // ── Animation loop ──
      var rafId = null;

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function (p) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color + p.alpha + ')';
          ctx.fill();

          // Move particle
          p.x += p.dx;
          p.y += p.dy;

          // Wrap around edges
          if (p.y < -5) {
            p.y = canvas.height + 5;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -5)               { p.x = canvas.width  + 5; }
          if (p.x > canvas.width + 5) { p.x = -5; }
        });

        rafId = requestAnimationFrame(draw);
      }

      // Pause animation when tab is not visible to save CPU/battery
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          cancelAnimationFrame(rafId);
          rafId = null;
        } else if (!rafId && localStorage.getItem('rr_bg_enabled') !== 'false') {
          draw();
        }
      });

      // Listen for footer toggle button events.
      document.addEventListener('rr:bg-toggle', function (e) {
        if (e.detail.enabled) {
          canvas.style.display = '';
          if (!rafId) draw();
        } else {
          cancelAnimationFrame(rafId);
          rafId = null;
          canvas.style.display = 'none';
        }
      });

      // Start only if preference allows.
      if (bgEnabled) {
        draw();
      } else {
        canvas.style.display = 'none';
      }
    }
  };

})(Drupal);
