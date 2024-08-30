/* @author web@2dsd.ru | webtitov.ru */
'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const WebT = {};

  WebT.settings = {
    lang_active_class: '--lang-active',
    modal_active_class: '--modal-show',
    directions_active_class: '--directions-show',
    sticky_header_scroll_position: 50,
  };

  WebT.elements = {
    lang_toggle: document.querySelectorAll('.js-lang-toggle'),
    scroll_links: document.querySelectorAll('a[href^="#"]'),
    modal_toggle: document.querySelectorAll('[data-modal-toggle]'),
    modal_box: document.querySelectorAll('[data-modal]'),
    overlay: document.querySelector('.theme-overlay'),
    close_modal: document.querySelectorAll('[data-modal-close]'),
    agree_cookie: document.querySelector('.js-cookie-close'),
    cookie_msg: document.querySelector('.cookie-msg'),
    close_cookie: document.querySelector('.cookie-msg'),
    directions_toggle: document.querySelector('.selected-value'),
    directions_list: document.querySelector('.form-wrapper__directions'),
    directions_items: document.querySelectorAll('label .directions-item__text'),
    directions_input: document.querySelector('#selected_direction')
  };

  /* Check if click outside target element */
  const isClickOutside = ($target, $class) => {
    const closeTarget = (e) => {
      if (!e.target.classList.contains($class)) {
        $target.classList.remove($class);
      }
    };
    if ($target === 0) {
      document.body.removeEventListener('click', closeTarget);
    } else {
      document.body.addEventListener('click', closeTarget);
    }
  };

  /* Close all modals */
  const closeModals = () => {
    // close all modals
    for (let i=0; i < WebT.elements.modal_box.length; i++) {
      WebT.elements.modal_box[i].classList.remove(WebT.settings.modal_active_class);
    }
    // remove active classes from modal toggle buttons
    for (let i=0; i < WebT.elements.modal_toggle.length; i++) {
      WebT.elements.modal_toggle[i].classList.remove(WebT.settings.modal_active_class);
    }
    // close overlay
    WebT.elements.overlay.classList.remove(WebT.settings.modal_active_class);
  }



  /* Language list toggle */
  (() => {
    for (let i=0; i < WebT.elements.lang_toggle.length; i++) {
      WebT.elements.lang_toggle[i].addEventListener('click', (e) => {
        let target_toggle = e.target,
            isTargetActive = false;
        target_toggle.classList[target_toggle.classList.contains(WebT.settings.lang_active_class) ? 'remove' : 'add'](WebT.settings.lang_active_class);
        if (isTargetActive === false) {
          closeModals();
          if (WebT.elements.overlay.classList.contains('--nav-opened')) {
            WebT.elements.overlay.classList.remove('--nav-opened');
          }
          isClickOutside(WebT.elements.lang_toggle[i], WebT.settings.lang_active_class);
          isTargetActive = true;
        } else {
          isClickOutside(0);
          isTargetActive = false;
        }
      });
    }
  })();

  /* Directions list toggle */
  (() => {
    WebT.elements.directions_toggle.addEventListener('click', (e) => {
      WebT.elements.directions_toggle.classList[WebT.elements.directions_toggle.classList.contains(WebT.settings.directions_active_class) ? 'remove' : 'add'](WebT.settings.directions_active_class);
    });

    for (let i=0; i<WebT.elements.directions_items.length; i++) {
      WebT.elements.directions_items[i].addEventListener('click', (event)=>{
        let new_text = event.target.innerHTML,
            new_value = event.target.getAttribute('data-direction');
        WebT.elements.directions_toggle.querySelector('.directions-item__text').innerHTML = new_text;
        WebT.elements.directions_input.value = new_value;
        WebT.elements.directions_toggle.classList.remove(WebT.settings.directions_active_class);
      });
    }
  })();

  /* Anchor smooth scroll */
  (() => {
    WebT.elements.scroll_links.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        closeModals();
        const offset = -30,
              element = document.querySelector(this.getAttribute('href')),
              target = element.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({top: target, behavior: 'smooth'});
      });
    });
  })();

  /* Modals */
  (() => {
    // Add click event to close modals
    for (let i=0; i < WebT.elements.close_modal.length; i++) {
      WebT.elements.close_modal[i].addEventListener('click', () => {
        closeModals();
      });
    }
    // Add click event to open target modal
    for (let i=0; i < WebT.elements.modal_toggle.length; i++) {
      WebT.elements.modal_toggle[i].addEventListener('click', () => {
        let this_toggle = WebT.elements.modal_toggle[i],
            target_modal = this_toggle.getAttribute('data-modal-toggle');
        if (target_modal === 'nav') {
          WebT.elements.overlay.classList[WebT.elements.overlay.classList.contains('--nav-opened') ? 'remove' : 'add']('--nav-opened');
        }
        // if nav modal opened
        if (target_modal === 'nav' && this_toggle.classList.contains(WebT.settings.modal_active_class)) {
          closeModals();
          WebT.elements.modal_toggle[i].classList.remove(WebT.settings.modal_active_class);
        } else {
          closeModals();
          document.querySelector(`[data-modal='${target_modal}']`).classList.add(WebT.settings.modal_active_class);
          WebT.elements.overlay.classList.add(WebT.settings.modal_active_class);
          WebT.elements.modal_toggle[i].classList.add(WebT.settings.modal_active_class);
        }
      });
    }
  })();

  /* Change header on scroll */
  (() => {
    const changeHeaderClass = () => {
      let scrollPosY = window.pageYOffset | document.body.scrollTop,
          header = document.getElementsByTagName('header')[0];
      if(scrollPosY > WebT.settings.sticky_header_scroll_position) {
        header.classList.add('sticky-header');
      } else if(scrollPosY <= WebT.settings.sticky_header_scroll_position) {
        header.classList.remove('sticky-header');
      }
    };
    window.addEventListener('scroll', changeHeaderClass);
  })();

  /* Cookie message */
  (() => {
    // Function to set cookies
    const setCookie = (cname, cvalue, exdays) => {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };
    // Function to get cookies
    const getCookie = (cname) => {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };

    WebT.elements.close_cookie.addEventListener('click', () => {
      WebT.elements.cookie_msg.classList.remove('--cookie-show');
      WebT.elements.cookie_msg.classList.add('--cookie-closed');
    });

    let cookie_msg = getCookie("cookie_msg_grothex");

    if (cookie_msg === "") {
      WebT.elements.cookie_msg.classList.add('--cookie-show');
      WebT.elements.agree_cookie.addEventListener('click', () => {
        WebT.elements.cookie_msg.classList.remove('--cookie-show');
        WebT.elements.cookie_msg.classList.add('--cookie-closed');
        setCookie("cookie_msg_grothex", "cookie_msg_grothex", 365);
      });
    } else {
      // console.log('cookie OK.');
    }
  })();

  /* Form sliders */
  (() => {
    const initSwiper = ($class) => {
      let nav_class = $class.replace('slider-', '');
      const swiper = new Swiper($class, {
        slidesPerView: 'auto',
        spaceBetween: 5,
        pagination: false,
        navigation: {
          nextEl: `${nav_class}-next`,
          prevEl: `${nav_class}-prev`,
        }
      });
    };

    initSwiper('.slider-jurisdictions');
    initSwiper('.slider-banks');
  })();

  /* todo: fix swiper width on mobile (wtf?) */
  (() => {
    const setSwiperWidth = () => {
      let swiper_width = window.innerWidth - 40;
      let sliders = document.querySelectorAll('.form-slider');
      for (let i = 0; i < sliders.length; i++) {
        sliders[i].style.maxWidth = swiper_width + 'px';
      }
    };

    if (window.matchMedia("(max-width: 1080px)").matches) {
      setSwiperWidth();
    }
    window.addEventListener('resize', setSwiperWidth);
  })();

});