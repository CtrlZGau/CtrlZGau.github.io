// Render the LaTeX the notes pipeline writes. kramdown leaves $$...$$ alone
// (math_engine: nil), so KaTeX finds it in the entry body.
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var body = document.querySelector('.entry-body');
    if (!body || typeof window.renderMathInElement !== 'function') return;
    window.renderMathInElement(body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  });
})();
