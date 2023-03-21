import { createElement } from './createElement';

export const initSplide = () => {
  createElement('script', document.head, {
    src: 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js',
    callback: init,
  });

  function init() {
    const sliders = [...document.querySelectorAll('.splide')];
    sliders.forEach((slider) => {
      const component = new Splide(slider, {
        gap: '2.5rem',
        perPage: 3,
        perMove: 1,
        breakpoints: {
          991: {
            perPage: 2,
            gap: '2.5rem',
          },
          767: {
            perPage: 1,
            gap: '2.5rem',
          },
        },
      });
      component.mount();
    });
  }
};
