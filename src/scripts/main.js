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
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// * POPOVER
const popoverTriggers = document.querySelectorAll('[data-popover-target]');
popoverTriggers.forEach((trigger) => {
  const popoverName = trigger.getAttribute('data-popover-target');
  const popover = document.querySelector(
    `[data-popover-name="${popoverName}"]`,
  );
  if (popover) {
    const closeBtn = popover.querySelector('[data-close-popover]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        popover.classList.remove('opacity-100');
        popover.classList.add('opacity-0');
        setTimeout(() => {
          popover.classList.add('hidden');
        }, 10);
      });
    }
    trigger.addEventListener('click', () => {
      popover.classList.remove('hidden');
      setTimeout(() => {
        popover.classList.remove('opacity-0');
        popover.classList.add('opacity-100');
      }, 10);
    });
  }
});

// * Form Wizard
const form = document.querySelector('form');
const nextBtn = document.querySelector('.btn-next');

nextBtn.addEventListener('click', (event) => {
  console.log('asdas');
  event.preventDefault();
  const inputs = form.querySelectorAll('input');
  const valid = Array.from(inputs).every((input) => input.value);
  if (valid) {
    const currentStep = parseInt(form.dataset.step);
    const nextStep = currentStep + 1;
    const nextSection = document.querySelector(`[data-step="${nextStep}"]`);
    form.dataset.step = nextStep;
    form.classList.add('hidden');
    nextSection.classList.remove('hidden');
  }
});
