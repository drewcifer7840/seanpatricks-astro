/**
 * SITE.JS — Small site-wide utilities
 * ------------------------------------
 *  1. Contact form submit handler (Google Forms hidden iframe)
 *  2. Business hours live status (Open Now / Closed)
 *  3. Footer copyright year
 *
 * Each block is self-guarded so the script works on any page,
 * even if the corresponding DOM elements aren't present.
 */

(function () {
  'use strict';

  // 1. CONTACT FORM SUBMIT HANDLER
  document.addEventListener('DOMContentLoaded', function () {
    var iframe = document.querySelector('iframe[name="hidden_iframe"]');
    var wrap = document.querySelector('.form-submit-wrap');
    if (iframe && wrap) {
      iframe.onload = function () {
        wrap.innerHTML = '<p>Thanks! Your message has been sent.</p>';
      };
    }
  });

  // 2. BUSINESS HOURS LIVE STATUS
  (function () {
    var now = new Date();
    var todayNum = now.getDay();
    var nowMins = now.getHours() * 60 + now.getMinutes();

    var dateEl = document.getElementById('sp-hours-date');
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
    }

    var statusEl = document.getElementById('sp-hours-status');
    var isOpen = false;

    document.querySelectorAll('.sp-hours__row').forEach(function (row) {
      var dayAttr = row.getAttribute('data-day');
      if (dayAttr === null) return;
      if (parseInt(dayAttr, 10) === todayNum) {
        row.classList.add('sp-hours__row--today');
        var openAttr = row.getAttribute('data-open');
        var closeAttr = row.getAttribute('data-close');
        if (openAttr && closeAttr) {
          var o = openAttr.split(':'), c = closeAttr.split(':');
          isOpen = nowMins >= (parseInt(o[0], 10) * 60 + parseInt(o[1], 10)) &&
                   nowMins <  (parseInt(c[0], 10) * 60 + parseInt(c[1], 10));
        }
      }
    });

    if (statusEl) {
      statusEl.textContent = isOpen ? 'Open Now' : 'Closed';
      statusEl.className = 'sp-hours__status ' +
        (isOpen ? 'sp-hours__status--open' : 'sp-hours__status--closed');
    }
  }());

  // 3. FOOTER COPYRIGHT YEAR
  (function () {
    var el = document.getElementById('sp-footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }());
})();
