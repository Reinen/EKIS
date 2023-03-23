/***  EKIS 2023 ****/

// * SWIPER JS
import 'https://unpkg.com/swiper/swiper-bundle.min.js';

(function () {
  const burgerMenu = () => {
    // * Burger Menu
    const button = document.querySelector('button[aria-label="Main menu"]');
    const menu = document.querySelector('.hidden.sm\\:hidden');

    button.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      menu.classList.toggle('block');
      menu.classList.toggle('overflow-hidden');
      menu.classList.toggle('overflow-auto');
      const expanded = button.getAttribute('aria-expanded') === 'true' || false;
      button.setAttribute('aria-expanded', !expanded);
      button.classList.toggle('x');
    });
  };

  const swiper = () => {
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
  };

  const popover = () => {
    // * POPOVER
    const popoverTriggers = document.querySelectorAll('[data-popover-target]');
    const bodyOverflow = document.querySelector('body');
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
              bodyOverflow.style.overflow = 'auto';
            }, 10);
          });
        }
        trigger.addEventListener('click', () => {
          popover.classList.remove('hidden');
          bodyOverflow.style.overflow = 'hidden';
          setTimeout(() => {
            popover.classList.remove('opacity-0');
            popover.classList.add('opacity-100');
          }, 10);
        });
      }
    });
  };

  const dragAndDrop = () => {
    // * DRAG AND DROP IMAGE UPLOAD WITH PREVIEW
    const dropZone = document.querySelector('.border-dashed');
    const imagePreviewContainer = document.querySelector(
      '#image-preview-container',
    );

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-blue-500');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-blue-500');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-blue-500');
      const files = e.dataTransfer.files;
      handleFiles(files);
    });

    const fileInput = document.querySelector('#image-upload');
    fileInput.addEventListener('change', () => {
      const files = fileInput.files;
      handleFiles(files);
    });

    function handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          const imagePreview = document.createElement('div');
          imagePreview.classList.add(
            'relative',
            'rounded-lg',
            'shadow-md',
            'm-2',
          );
          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = '&times;';
          deleteButton.classList.add(
            'absolute',
            'top-0',
            'right-0',
            'text-red-500',
            'cursor-pointer',
            'hover:text-red-600',
            'bg-white',
            'font-bold',
            'px-2',
            'rounded-bl-lg',
          );
          deleteButton.addEventListener('click', () => {
            imagePreview.remove();
          });
          const img = document.createElement('img');
          img.src = reader.result;
          img.classList.add('w-full', 'rounded-lg');
          imagePreview.appendChild(deleteButton);
          imagePreview.appendChild(img);
          imagePreviewContainer.appendChild(imagePreview);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const formWizard = () => {
    // * FORM WIZARD
    const form = document.querySelector('#form-wizard');
    const prevBtn = document.querySelectorAll('.prev-btn');
    const nextBtn = document.querySelectorAll('.next-btn');

    let currentStep = 0;

    function showStep(step) {
      scrollToFormTop(-50);
      const formSteps = form.querySelectorAll('[data-form]');
      formSteps.forEach((formStep, index) => {
        if (index === step) {
          formStep.classList.remove('hidden');
        } else {
          formStep.classList.add('hidden');
        }
      });

      const currentSteps = document.querySelectorAll('[data-step]');
      currentSteps.forEach((currentStep, index) => {
        if (index === step) {
          currentStep.classList.add('active');
        } else {
          currentStep.classList.remove('active');
        }
      });
    }

    function scrollToFormTop(offset) {
      const form = document.querySelector('body');
      const formTop = form.getBoundingClientRect().top;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const offsetTop = formTop + scrollTop - offset;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }

    function handlePrev() {
      currentStep--;
      showStep(currentStep);
    }

    function handleNext() {
      currentStep++;
      showStep(currentStep);
    }

    prevBtn.forEach((button) => {
      button.addEventListener('click', handlePrev);
    });

    nextBtn.forEach((button) => {
      button.addEventListener('click', handleNext);
    });

    // showStep(currentStep);
  };

  // Wait for the DOM to finish loading before running the script
  document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code goes here
    burgerMenu();
    swiper();
    popover();
    dragAndDrop();
    formWizard();
  });
})();
