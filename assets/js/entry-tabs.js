// Two panes on a log entry: the transcription and the scanned pages.
// No framework; the markup ships with the entry and this only toggles it.
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-entry-tabs]').forEach(function (tabs) {
      var panes = tabs.parentNode.querySelectorAll('.entry-pane');
      tabs.addEventListener('click', function (event) {
        var button = event.target.closest('[data-pane]');
        if (!button) return;
        var wanted = button.getAttribute('data-pane');
        tabs.querySelectorAll('[data-pane]').forEach(function (other) {
          other.classList.toggle('is-on', other === button);
        });
        panes.forEach(function (pane) {
          pane.hidden = pane.getAttribute('data-pane') !== wanted;
        });
      });
    });
  });
})();
