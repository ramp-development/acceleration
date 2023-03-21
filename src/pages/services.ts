import { createElement } from '$utils/createElement';

export const services = () => {
  let numberLoaded = 0;
  createElement('script', document.head, {
    src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
    defer: true,
    callback: init,
  });
  createElement('script', document.head, {
    src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js',
    defer: true,
    callback: init,
  });

  const sticky = document.querySelector('[data-sticky="vertical-center"]');
  const top = `${(window.innerHeight - sticky.offsetHeight) / 2}px`;
  sticky.style.top = top;

  function init() {
    numberLoaded += 1;
    if (numberLoaded !== 2) return;

    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector('.capabilities_header'),
      items = [...document.querySelectorAll('.capabilities_list-item')],
      targets = [...document.querySelectorAll('.capabilities_illustration')];

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: `top ${top}`,
          end: `bottom ${top}`,
          scrub: true,
        },
      });

      headerTl.to(targets, { opacity: 0.15, duration: 1 });

      items.forEach((item, index) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 50%',
            end: 'bottom 50%',
            scrub: true,
          },
        });

        const target = targets.find((target) => target.classList.contains(`is-${index + 1}`));

        timeline.to(target, { opacity: 1, duration: 1 });
        timeline.to(target, { opacity: 0.15, duration: 1 }, '<2');
      });
    });
  }
};
