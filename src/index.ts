import { initCopyURL } from '$utils/initCopyURL';
import { initSplide } from '$utils/initSplide';

import { pages } from './pages';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('index');

  pages();

  const hasSplide = document.querySelector('.splide');
  if (hasSplide) initSplide();

  const hasCopyURL = document.querySelector('[data-copy-url]');
  if (hasCopyURL) initCopyURL();
});
