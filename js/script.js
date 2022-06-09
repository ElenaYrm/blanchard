// header-bottom dropdown
const menuBtn = document.querySelectorAll('.tab');
const drops = document.querySelectorAll('.dropdown');

menuBtn.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    let currentBtn = e.currentTarget;
    let currentDrop = currentBtn.closest('.menu__item').querySelector('.dropdown');

    menuBtn.forEach(function (el) {
      if (el !== currentBtn) {
        el.classList.remove('tab--active');
        el.setAttribute("aria-expanded", "false");
      }
    });

    drops.forEach(function (el) {
      if (el !== currentDrop) {
        el.classList.remove('dropdown--active');
        el.setAttribute("aria-hidden", "true");
      }
    });

    currentDrop.classList.toggle('dropdown--active');
    currentDrop.setAttribute("aria-hidden", "false");
    currentBtn.classList.toggle('tab--active');
    currentBtn.setAttribute("aria-expanded", "true");
  });
});

document.addEventListener('click', function (e) {
  if (!e.target.closest('.menu__list')) {

    menuBtn.forEach(function (el) {
      el.classList.remove('tab--active');
      el.setAttribute("aria-expanded", "false");
    });

    drops.forEach(function (el) {
      el.classList.remove('dropdown--active');
      el.setAttribute("aria-hidden", "true");
    });
  }
});

// hero swiper
let mainSwiper = new Swiper('.main-slider', {
  wrapperClass: 'main-slider__wrapper',
  slideClass: 'main-slider__slide',
  loop: true,
  autoplay: {
    delay: 4000,
  },
})

// gallery select
const element = document.querySelector('.filter__select');
const choices = new Choices(element,{
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: "",
});

// gallery swiper
let gallerySwiper = new Swiper('.gallery-slider', {
  wrapperClass: 'gallery-slider__wrapper',
  slideClass: 'gallery-slider__slide',
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 3,

  pagination: {
    el: '.gallery-nav__pagination',
    type: 'fraction',
  },

  navigation: {
    nextEl: '.gallery-nav__bnt-next',
    prevEl: '.gallery-nav__bnt-prev',
  },
})

// gallery modal
const btn = document.querySelectorAll('.gallery-slider__slide');
const modal = document.querySelector('.modal__list');
const notes = document.querySelectorAll('.modal__item');
const exitBtn = document.querySelectorAll('.note__btn');

btn.forEach(function (element) {
  element.addEventListener('click', function (e) {
   let path = e.currentTarget.getAttribute('data-path');

   notes.forEach(function (el) {
     el.classList.remove('modal__item--active');
   })

   document.querySelector(`[data-gallery="${path}"]`).classList.add('modal__item--active');
   modal.classList.add('modal__list--active');

  });
});

exitBtn.forEach(function (btn) {
  btn.addEventListener('click', function () {
    modal.classList.remove('modal__list--active');
    notes.classList.remove('modal__item--active');
  })
})
