import { createElement } from './createElement';

export const initCombine = () => {
  createElement('script', document.head, {
    src: 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmscombine@1/cmscombine.js',
    async: true,
    callback: init,
  });

  createElement('script', document.head, {
    src: 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmssort@1/cmssort.js',
    async: true,
    callback: init,
  });

  let numberAdded = 0;
  const numberRequired = 2;

  function init() {
    numberAdded += 1;
    if (numberAdded !== numberRequired) return;

    const wrappers = [...document.querySelectorAll('[r-combine-el="wrapper"]')];
    wrappers.forEach((wrapper) => {
      const sort = wrapper.querySelector('[fs-cmssort-element="trigger"]');

      setTimeout(() => {
        sort.click();
        const number = Number(wrapper.getAttribute('r-combine-number'));

        if (!number) return;
        setTimeout(() => {
          const list = wrapper.querySelector('[fs-cmscombine-element="list"]');
          [...list?.children].forEach((child, index) => {
            if (index >= number) child.remove();
          });
        }, 1);
      }, 1);
    });
  }
};
