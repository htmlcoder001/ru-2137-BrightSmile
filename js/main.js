'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const BV = {};

  BV.settings = {
    faq_item_active_class: '--item-active'
  };

  BV.elements = {
    scroll_links: document.querySelectorAll('a[href^="#"]'),
    faq_items: document.querySelectorAll('.faq-wrapper__item')
  };


  /* Anchor smooth scroll */
  (() => {
    BV.elements.scroll_links.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const offset = -30,
              element = document.querySelector(this.getAttribute('href')),
              target = element.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({top: target, behavior: 'smooth'});
      });
    });
  })();

  /* FAQ tabs */
  (() => {
    BV.elements.faq_items.forEach((item) => {
      item.querySelector('.faq-item__question').addEventListener('click', () => {
        item.classList[item.classList.contains(BV.settings.faq_item_active_class) ? "remove" : "add"](BV.settings.faq_item_active_class);
      });
    });
  })();

});