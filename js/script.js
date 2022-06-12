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

  a11y: {
    prevSlideMessage: 'Предыдущая картина',
    nextSlideMessage: 'Следующая картина',
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

// events swiper
let eventsSwiper = new Swiper('.events-slider', {
  wrapperClass: 'events-slider__wrapper',
  slideClass: 'events-slider__slide',
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 3,

  navigation: {
    nextEl: '.events-slider__btn-next',
    prevEl: '.events-slider__btn-prev',
  },

  a11y: {
    prevSlideMessage: 'Предыдущее событие',
    nextSlideMessage: 'Следующее событие',
  },
})

// projects tooltip
tippy('.projects__tooltip', {
  theme: 'tooltip',
  maxWidth: 264,
});

// projects swiper
let projectsSwiper = new Swiper('.projects-slider', {
  wrapperClass: 'projects-slider__wrapper',
  slideClass: 'projects-slider__slide',
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 3,

  navigation: {
    nextEl: '.projects-slider__btn-next',
    prevEl: '.projects-slider__btn-prev',
  },

  a11y: {
    prevSlideMessage: 'Предыдущее событие',
    nextSlideMessage: 'Следующее событие',
  },
})

// input mask tel
const selector = document.querySelector("input[type='tel']");
const im = new Inputmask("+7(999) 999-99-99");

im.mask(selector);

// validate form
new window.JustValidate('.form', {
  rules: {
    name: {
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    tel: {
      required: true,
      function: () => {
        const phone = selector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      },
    },
  },

  messages: {
    name: {
      required: 'Вы не ввели имя',
      minLength: 'Поле должно содержать более 3 символов',
      maxLength: 'Поле должно содержать не более 30 символов',
    },
    tel: {
      required: 'Вы не ввели телефон',
      function: 'Поле должно содержать 10 символов',
    },
    email: {
      required: 'Вы не ввели e-mail',
      email: 'Введен некорректный e-mail',
    },
  },

  colorWrong: '#D11616',

  submitHandler: function (thisForm, values, ajax) {

    ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      data: values,
      async: true,
      callback: function (response) {
        alert('Response from server: ' + response)
      },
      error: function (response) {
        alert('Response from server: ' + response)
      }
    });
  },
});

// contacts map
ymaps.ready(init);
function init(){
  let center = [55.75846806898367,37.60108850004083];

  let yandexMap = new ymaps.Map("map", {
    center: center,
    zoom: 14,
  });

  let newPlacemark = new ymaps.Placemark(center, {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/placeMark.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-10, -5]
  });

  yandexMap.geoObjects.add(newPlacemark);

  yandexMap.controls.remove('searchControl');
  yandexMap.controls.remove('trafficControl');
  yandexMap.controls.remove('typeSelector');
  yandexMap.controls.remove('fullscreenControl');
  yandexMap.controls.remove('rulerControl');
  map.behaviors.disable(['scrollZoom']);
}
