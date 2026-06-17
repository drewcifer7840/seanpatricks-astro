/**
 * ACCORDION.JS — Legacy accordion toggle (pre-sp- component era)
 * --------------------------------------------------------------
 * Toggles .accordion-item.active class with slideDown/slideUp
 * animation. Used by the FAQ section in index.html.
 *
 * NOTE: This is legacy. In Astro, this will be replaced by a
 * <details>/<summary>-based component using .sp-faq__item.
 */

(function () {
  "use strict";
  const ACCORDION_FLAG_REF = { value: true };

  function slideDown(target, duration) {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    const height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  }

  function slideUp(target, duration) {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
    }, duration);
  }

  function accordionHandler(e) {
    e.preventDefault();
    const duration = 400;
    if (ACCORDION_FLAG_REF.value === true) {
      ACCORDION_FLAG_REF.value = false;
      const item = e.currentTarget.closest('.accordion-item');
      const container = item.closest('.accordion');
      const items = container.querySelectorAll('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const activeContent = container.querySelector('.accordion-item.active .accordion-content');

      if (!item.classList.contains('active')) {
        items.forEach(function (i) { i.classList.remove('active'); });
        item.classList.add('active');
        if (activeContent !== null) { slideUp(activeContent, duration); }
        slideDown(content, duration);
      } else {
        item.classList.remove('active');
        slideUp(content, duration);
      }
      window.setTimeout(function () { ACCORDION_FLAG_REF.value = true; }, duration);
    }
  }

  document.querySelectorAll('.accordion-btn').forEach(function (btn) {
    btn.addEventListener('click', accordionHandler);
  });
})();
