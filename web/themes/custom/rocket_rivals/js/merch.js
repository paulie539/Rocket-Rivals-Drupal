(function () {
  'use strict';

  var INTERVAL = 4000; // ms between auto-advances

  document.addEventListener('DOMContentLoaded', function () {
    var carousels = document.querySelectorAll('.rr-carousel');
    carousels.forEach(initCarousel);
  });

  function initCarousel(carousel) {
    var track       = carousel.querySelector('.rr-carousel__track');
    var slides      = carousel.querySelectorAll('.rr-carousel__slide');
    var dots        = carousel.querySelectorAll('.rr-carousel__dot');
    var prevBtn     = carousel.querySelector('.rr-carousel__arrow--prev');
    var nextBtn     = carousel.querySelector('.rr-carousel__arrow--next');
    var progressBar = carousel.querySelector('.rr-carousel__progress-bar');

    if (!slides.length) return;

    var total   = slides.length;
    var current = 0;
    var timer   = null;
    var paused  = false;

    // ── Render ──────────────────────────────────────────────

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === current);
      });
      resetProgress();
    }

    // ── Progress bar ────────────────────────────────────────

    function resetProgress() {
      if (!progressBar) return;
      // Cut transition, reset to 0, then animate to 100% over INTERVAL
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      // Force reflow
      void progressBar.offsetWidth;
      progressBar.style.transition = 'width ' + INTERVAL + 'ms linear';
      progressBar.style.width = paused ? '0%' : '100%';
    }

    // ── Auto-scroll ─────────────────────────────────────────

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(function () {
        if (!paused) goTo(current + 1);
      }, INTERVAL);
    }

    // ── Events ───────────────────────────────────────────────

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(current - 1);
        startTimer(); // reset interval on manual nav
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(current + 1);
        startTimer();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        startTimer();
      });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', function () {
      paused = true;
      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
      }
    });

    carousel.addEventListener('mouseleave', function () {
      paused = false;
      resetProgress();
    });

    // Touch / swipe support
    var touchStartX = 0;
    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        goTo(dx < 0 ? current + 1 : current - 1);
        startTimer();
      }
    }, { passive: true });

    // ── Init ─────────────────────────────────────────────────
    goTo(0);
    startTimer();
  }
})();
