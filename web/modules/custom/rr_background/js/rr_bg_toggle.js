/**
 * @file
 * Particle-toggle button for the Rocket Rivals footer.
 *
 * Reads/writes 'rr_bg_enabled' in localStorage and dispatches a
 * 'rr:bg-toggle' CustomEvent on document so rr_background.js can
 * start or stop the animation loop without a page reload.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.rrBgToggle = {
    attach: function (context, settings) {
      const btn = document.getElementById('rr-bg-toggle');
      if (!btn || btn.dataset.toggleAttached) return;
      btn.dataset.toggleAttached = 'true';

      // Default preference is enabled; only disabled when explicitly set.
      const isEnabled = localStorage.getItem('rr_bg_enabled') !== 'false';
      _applyState(btn, isEnabled);

      btn.addEventListener('click', function () {
        const next = localStorage.getItem('rr_bg_enabled') === 'false';
        localStorage.setItem('rr_bg_enabled', next ? 'true' : 'false');
        _applyState(btn, next);
        document.dispatchEvent(
          new CustomEvent('rr:bg-toggle', { detail: { enabled: next } })
        );
      });
    }
  };

  function _applyState(btn, enabled) {
    btn.classList.toggle('is-off', !enabled);
    btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    btn.querySelector('.rr-bg-toggle__label').textContent =
      enabled ? 'Background Effect' : 'Background Effect';
  }

})(Drupal);
