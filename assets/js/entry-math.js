// Render the LaTeX in a log entry. With kramdown's math engine disabled it
// leaves .math elements behind; an entry may also carry raw $$, so handle
// both rather than depend on which one appears.
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var body = document.querySelector('.entry-body');
    if (!body || typeof window.katex === 'undefined') return;

    body.querySelectorAll('.math').forEach(function (node) {
      var tex = node.textContent.replace(/^\s*\$\$?|\$\$?\s*$/g, '');
      try {
        window.katex.render(tex, node, {
          displayMode: node.tagName === 'DIV',
          throwOnError: false
        });
      } catch (e) { /* leave the source visible rather than blanking it */ }
    });

    if (typeof window.renderMathInElement === 'function') {
      window.renderMathInElement(body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        ignoredClasses: ['math'],
        throwOnError: false
      });
    }
  });
})();
