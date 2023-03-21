import { initCopyURL } from '$utils/initCopyURL';
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

  const hasSplide = document.querySelector('.splide');
  if (hasSplide) initSplide();

  const hasCopyURL = document.querySelector('[data-copy-url]');
  if (hasCopyURL) initCopyURL();
});
