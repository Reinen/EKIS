/***  EKIS 2023 ****/

// * SWIPER JS
import 'https://unpkg.com/swiper/swiper-bundle.min.js';

// * HIGHCHARTS
import 'https://code.highcharts.com/maps/highmaps.js';

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

  const dragAndDrop = () => {
    // * DRAG AND DROP IMAGE UPLOAD WITH PREVIEW
    const dropZone = document.querySelector('.border-dashed');
    const imagePreviewContainer = document.querySelector(
      '#image-preview-container',
    );

    if (dropZone) {
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
    }

    const fileInput = document.querySelector('#image-upload');

    if (fileInput) {
      fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        handleFiles(files);
      });
    }

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
      const currentFormStep = form.querySelectorAll('[data-form]')[currentStep];
      const requiredFields = currentFormStep.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach((field) => {
        const errorContainer = field.parentNode.querySelector('.error-message');
        if (field.value === '') {
          // Append the error message
          errorContainer.textContent = `This field is required.`;
          errorContainer.classList.remove('hidden');

          isValid = false;
          field.classList.add('invalid:border-ekis');
        } else {
          errorContainer.textContent = ``;
          errorContainer.classList.add('hidden');
          field.classList.remove('invalid:border-ekis');
        }

        // Add a change event listener to the field
        field.addEventListener('change', () => {
          errorContainer.textContent = '';
          errorContainer.classList.add('hidden');
          field.classList.remove('invalid:border-ekis');
        });
      });

      if (isValid) {
        currentStep++;
        showStep(currentStep);
      }
    }

    prevBtn.forEach((button) => {
      button.addEventListener('click', handlePrev);
    });

    nextBtn.forEach((button) => {
      button.addEventListener('click', handleNext);
    });
  };

  const cities = () => {
    let data;

    async function fetchData() {
      const response = await fetch(
        'https://code.highcharts.com/mapdata/countries/ph/ph-all.geo.json',
      );
      const jsonData = await response.json();
      if (jsonData.features) {
        data = jsonData.features
          .filter(
            (item) =>
              item.properties.name !== null &&
              item.properties.name !== undefined,
          )
          .map((item) => ({
            name: item.properties.name,
            value:
              item.properties.name +
              ',' +
              item.properties.longitude +
              ',' +
              item.properties.latitude,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
      }
      return data;
    }

    async function populateSelect() {
      const select = document.getElementById('cities');
      const cities = await fetchData();
      cities.forEach((city) => {
        const option = document.createElement('option');
        option.text = city.name;
        option.value = city.value;

        if (select) {
          select.appendChild(option);
        }
      });
    }

    populateSelect();
  };

  const popover = (option) => {
    // * POPOVER
    const bodyOverflow = document.querySelector('body');
    const popover = document.querySelector(`[data-popover-name="popover"]`);
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

      // Open Popover
      popover.classList.remove('hidden');
      bodyOverflow.style.overflow = 'hidden';
      setTimeout(() => {
        popover.classList.remove('opacity-0');
        popover.classList.add('opacity-100');
      }, 10);

      // Populate the details
      const image1 = document.querySelector(`.image1`);
      const image2 = document.querySelector(`.image2`);
      const title = document.querySelector(`.title`);
      const description = document.querySelector(`.description`);
      const link = document.querySelector(`.link`);
      const category = document.querySelector(`.category`);

      image1.src = option.image1;
      image2.src = option.image2;
      title.textContent = option.title;
      description.textContent = option.description;
      category.textContent = option.category;
      link.href = option.link;
    }
  };

  const highcharts = async () => {
    const topology = await fetch(
      'https://code.highcharts.com/mapdata/countries/ph/ph-all.topo.json',
    ).then((response) => response.json());

    const data = await fetch('/json/data.json').then((response) =>
      response.json(),
    );

    const ekisChart = document.querySelector(`#ekisChart`);

    if (ekisChart) {
      // Initialize the chart
      Highcharts.mapChart(ekisChart, {
        chart: {
          map: topology,
        },

        title: {
          text: '',
        },

        mapNavigation: {
          enabled: false,
          enableDoubleClickZoomTo: true,
        },

        tooltip: {
          headerFormat: '',
          pointFormat: '<b>{point.name}</b><br>{point.title}',
          enabled: false,
        },

        series: [
          {
            // Use the gb-all map with no data as a basemap
            name: '',
            borderColor: '#A0A0A0',
            nullColor: 'rgba(200, 200, 200, 0.3)',
            showInLegend: false,
          },
          {
            name: 'Separators',
            type: 'mapline',
            nullColor: '#707070',
            showInLegend: false,
            enableMouseTracking: false,
            accessibility: {
              enabled: false,
            },
          },
          {
            // Specify points using lat/lon
            type: 'mappoint',
            name: 'EKIS Hotspots',
            color: 'rgb(255 34 23)',
            data: data,
            point: {
              events: {
                click: function (event) {
                  // POPOVER DETAILS
                  popover(this.options);
                },
              },
            },
            marker: {
              symbol: 'url(/images/ekis01.png)',
              width: 45,
              height: 45,
            },
          },
        ],
      });
    }
  };

  // Wait for the DOM to finish loading before running the script
  document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code goes here
    burgerMenu();
    swiper();
    dragAndDrop();
    formWizard();
    cities();
    highcharts();
  });
})();
