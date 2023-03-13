/***  EKIS 2023 ****/

import 'https://unpkg.com/swiper/swiper-bundle.min.js';

// * Burger Menu
const button = document.querySelector('button[aria-label="Main menu"]');
const menu = document.querySelector('.hidden.sm\\:hidden');

button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  menu.classList.toggle('block');
  const expanded = button.getAttribute('aria-expanded') === 'true' || false;
  button.setAttribute('aria-expanded', !expanded);
});

// * Initialize Swiper
const swiper = new Swiper('.swiper-container', {
  loop: true,
  spaceBetween: 30,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
