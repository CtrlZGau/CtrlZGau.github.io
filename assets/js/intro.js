/* Home page intro: type the name, fade the hero in, reveal on scroll.
   Plain CSS + JS, no libraries. The page is fully readable without any of it. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seen = false;

  try {
    seen = sessionStorage.getItem('intro-played') === '1';
  } catch (e) {
    /* Private mode or blocked storage: just play it. */
  }

  var nameText = document.querySelector('.name-text');
  var cursor = document.querySelector('.cursor');
  var letters = [];

  /* Split the name into letters. They stay in the DOM either way, so the h1
     reserves its final size from the first paint. */
  if (nameText) {
    var chars = nameText.textContent.split('');
    nameText.textContent = '';
    chars.forEach(function (ch) {
      var span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch;
      nameText.appendChild(span);
      letters.push(span);
    });
  }

  /* --- Scroll reveal ----------------------------------------------------- */

  function drawEdges(section) {
    Array.prototype.forEach.call(section.querySelectorAll('.edge'), function (edge, i) {
      var len = edge.getTotalLength();
      var dash = edge.getAttribute('stroke-dasharray');

      edge.style.strokeDasharray = len + ' ' + len;
      edge.style.strokeDashoffset = len;
      edge.classList.add('is-drawing');

      window.setTimeout(function () {
        edge.style.strokeDashoffset = '0';
      }, 120 * i + 20);

      /* Put the feedback loop back on its original dashes once drawn. */
      window.setTimeout(function () {
        edge.classList.remove('is-drawing');
        edge.classList.add('is-drawn');
        edge.style.strokeDasharray = dash || '';
        edge.style.strokeDashoffset = '';
      }, 120 * i + 20 + 700);
    });
  }

  function observeReveals() {
    var targets = document.querySelectorAll('.reveal:not(.is-in)');
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        if (entry.target.classList.contains('diagram')) drawEdges(entry.target);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* --- Intro sequence ---------------------------------------------------- */

  function fadeInHero() {
    var steps = [];
    document.querySelectorAll('[data-intro="prompt"]').forEach(function (el) {
      steps.push([el, 0]);
    });
    document.querySelectorAll('[data-intro="chip"]').forEach(function (el, i) {
      steps.push([el, 120 + i * 80]);
    });
    document.querySelectorAll('[data-intro="lede"]').forEach(function (el) {
      steps.push([el, 620]);
    });
    document.querySelectorAll('[data-intro="nav"]').forEach(function (el) {
      steps.push([el, 780]);
    });

    steps.forEach(function (step) {
      window.setTimeout(function () { step[0].classList.add('is-in'); }, step[1]);
    });

    window.setTimeout(observeReveals, 900);
  }

  function typeName() {
    if (cursor && nameText) nameText.insertBefore(cursor, nameText.firstChild);

    var i = 0;
    (function next() {
      if (i >= letters.length) {
        window.setTimeout(fadeInHero, 300);
        return;
      }
      var letter = letters[i];
      letter.classList.add('is-on');
      if (cursor) letter.parentNode.insertBefore(cursor, letter.nextSibling);
      i += 1;
      window.setTimeout(next, 110 + (Math.random() * 60 - 30));
    })();
  }

  /* --- Go ---------------------------------------------------------------- */

  /* Dropping the class hands every element straight back to its final state,
     which is exactly what reduced motion and a repeat visit should show. */
  if (reduced || seen) {
    root.classList.remove('js-intro');
    return;
  }

  try {
    sessionStorage.setItem('intro-played', '1');
  } catch (e) {
    /* Not fatal — the intro simply plays again next time. */
  }

  window.setTimeout(typeName, 500);
})();
