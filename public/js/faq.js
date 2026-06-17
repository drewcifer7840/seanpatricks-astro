/**
 * FAQ.JS — Toggle .sp-faq__item via data-open attribute
 * ------------------------------------------------------
 * Lightweight, CSS-driven accordion. The .sp-faq__question
 * element acts as the click target. The .sp-faq__answer's
 * max-height transition is handled entirely by styles.css.
 */

document.addEventListener('DOMContentLoaded', function () {
  var faqItems = document.querySelectorAll('.sp-faq__item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.sp-faq__question');
    if (!question) return;

    question.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';

      // Close all items first
      faqItems.forEach(function (otherItem) {
        otherItem.setAttribute('data-open', 'false');
      });

      // Toggle current item
      item.setAttribute('data-open', !isOpen ? 'true' : 'false');
    });
  });
});
