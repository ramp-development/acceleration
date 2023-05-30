import { about } from './about';
import { careers } from './careers';
import { resources } from './resources';
import { services } from './services';

export const pages = () => {
  const { pathname } = window.location;
  switch (pathname) {
    case '/about-us':
      about();
      break;
    case '/services':
      services();
      break;
    case '/resources':
      resources();
      break;
    case '/careers':
      careers();
      break;
  }
};
