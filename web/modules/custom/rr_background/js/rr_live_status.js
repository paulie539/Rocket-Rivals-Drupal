(function (Drupal) {
  'use strict';

  Drupal.behaviors.rrLiveStatus = {
    attach: function (context) {
      var el = context.querySelector
        ? context.querySelector('#rr-live-status')
        : document.getElementById('rr-live-status');

      if (!el || el.dataset.rrInitialized) {
        return;
      }
      el.dataset.rrInitialized = '1';

      function update() {
        fetch('/rr/stream-status')
          .then(function (r) { return r.json(); })
          .then(function (data) {
            if (data.live) {
              el.innerHTML =
                '<a href="https://www.twitch.tv/rocket_rivals"' +
                '   class="rr-live-badge"' +
                '   target="_blank"' +
                '   rel="noopener noreferrer">' +
                '  <span class="rr-live-dot" aria-hidden="true"></span>' +
                '  <span class="rr-live-text">LIVE</span>' +
                '</a>';
            } else {
              el.innerHTML = '';
            }
          })
          .catch(function () {
            el.innerHTML = '';
          });
      }

      update();
      setInterval(update, 60000);
    }
  };

})(Drupal);
