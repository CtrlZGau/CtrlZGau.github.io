// Render the LaTeX in a log entry.
//
// With kramdown's math engine disabled it wraps $$...$$ in .kdmath — a <div>
// when the maths is its own block, a <span> when it sits inside a line — and
// keeps the delimiters in the text. Single $...$ it does not touch at all, so
// KaTeX's auto-render picks those up afterwards.
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var body = document.querySelector('.entry-body');
    if (!body || typeof window.katex === 'undefined') return;

    body.querySelectorAll('.kdmath').forEach(function (node) {
      var tex = node.textContent.trim().replace(/^\$\$?|\$\$?$/g, '').trim();
      try {
        window.katex.render(tex, node, {
          displayMode: node.tagName === 'DIV',
          throwOnError: false
        });
      } catch (e) { /* leave the source on the page rather than blanking it */ }
    });

    if (typeof window.renderMathInElement === 'function') {
      window.renderMathInElement(body, {
        delimiters: [{ left: '$', right: '$', display: false }],
        ignoredClasses: ['kdmath'],
        throwOnError: false
      });
    }
  });
})();
