import { isWithinLastXTime } from '$utils/isWithinLastXTime';
import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';
import { stringToDate } from '$utils/stringToDate';

export const localisation = () => {
  // Get all resources
  const attr = 'data-localise';
  const resources = queryElements<HTMLDivElement>(`[${attr}="resource"]`);

  // Loop through the resources
  const currentResources = resources.filter((resource) => {
    // Get the date text and convert it to a date object
    const dateText = queryElement<HTMLDivElement>(`[${attr}="resource-date"]`, resource);
    if (!dateText?.textContent) return;
    const date = stringToDate(dateText.textContent);

    // Check if the date is within the last year
    const isWithinAYear = isWithinLastXTime(date, 1, 'years');
    return isWithinAYear;
  });

  // We will use a Map to group elements by their market
  const marketGroups: Map<string, HTMLElement[]> = new Map();

  // Loop over the resources and group them by their market
  currentResources.forEach((currentResource) => {
    const market = currentResource.dataset.priorityIn;
    if (!market) return;
    if (!marketGroups.has(market)) marketGroups.set(market, []);
    marketGroups.get(market)?.push(currentResource);
  });

  // Now we loop over the groups and append the order attribute
  for (const marketElements of marketGroups.values()) {
    marketElements.forEach((element, index) => {
      element.dataset.priorityOrder = `${index + 1}`;
    });
  }
};
