import { initSplide } from '$utils/initSplide';

import { resources } from './pages/resources';
import { services } from './pages/services';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('index');

  const { pathname } = window.location;
  switch (pathname) {
    case '/services':
      services();
      break;
    case '/resources':
      resources();
      break;
  }

  // const hasCombine = document.querySelector('[r-combine-el="wrapper"]');
  // if (hasCombine) initCombine();

  const hasSplide = document.querySelector('.splide');
  if (hasSplide) initSplide();
});
