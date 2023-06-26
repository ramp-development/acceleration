import { dropdowns } from './dropdowns';
import { filters } from './filters';
import { localisation } from './localisation';

export const resources = () => {
  filters();
  dropdowns();
  localisation();
};
