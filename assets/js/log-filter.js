/* Client-side tag filter for /log. The selected tag lives in the URL
   (?tag=papers) so a filtered view can be linked and reloaded. */
(function () {
  'use strict';

  var pills = document.querySelectorAll('.filters .pill');
  var rows = document.querySelectorAll('.log-row');
  var empty = document.querySelector('.log-empty');
  if (!pills.length) return;

  function apply(tag, push) {
    var shown = 0;

    rows.forEach(function (row) {
      var match = tag === 'all' || row.getAttribute('data-tag') === tag;
      row.hidden = !match;
      if (match) shown += 1;
    });

    pills.forEach(function (pill) {
      var active = pill.getAttribute('data-tag') === tag;
      pill.classList.toggle('is-active', active);
      pill.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    /* The newest post of the *visible* set carries the accent number. */
    var first = true;
    rows.forEach(function (row) {
      var num = row.querySelector('.log-num');
      if (!num) return;
      num.classList.toggle('is-new', !row.hidden && first);
      if (!row.hidden) first = false;
    });

    if (empty) empty.hidden = shown !== 0;

    if (push) {
      var url = tag === 'all'
        ? window.location.pathname
        : window.location.pathname + '?tag=' + encodeURIComponent(tag);
      window.history.pushState({ tag: tag }, '', url);
    }
  }

  function fromUrl() {
    var tag = new URLSearchParams(window.location.search).get('tag') || 'all';
    var known = Array.prototype.some.call(pills, function (p) {
      return p.getAttribute('data-tag') === tag;
    });
    return known ? tag : 'all';
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      apply(pill.getAttribute('data-tag'), true);
    });
  });

  window.addEventListener('popstate', function () {
    apply(fromUrl(), false);
  });

  apply(fromUrl(), false);
})();
