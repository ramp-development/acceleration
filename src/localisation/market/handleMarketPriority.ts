import { createElementPlaceholder } from '../utils/createElementPlaceholder';
import { elementsMap } from '../utils/elementsMap';
import { placeElementAt } from '../utils/placeElementAt';

/**
 * Adjust the position of the elements based on their "data-priority-in" and "data-priority-order" attributes
 *
 * @param market - The current market
 * @param elements - A list of elements to reposition based on their priority
 */
export const handleMarketPriority = (market: string, elements: HTMLDivElement[]): void => {
  elements.forEach((element) => {
    // Get the market for which the element should be prioritized
    const { priorityIn } = element.dataset;
    if (!priorityIn) return;

    if (priorityIn === market) {
      // Get the order in which the element should be prioritized and the parent element
      const { priorityOrder } = element.dataset;
      const parent = element.parentElement;
      if (!priorityOrder || !parent) return;

      // Create a placeholder, clone and replace the element to be removed with it
      const placeholder = createElementPlaceholder(element, priorityIn);
      const clone = element.cloneNode(true) as HTMLDivElement;
      element.replaceWith(placeholder);

      // Place the element at the given index
      placeElementAt(parent, element, Number(priorityOrder) - 1);

      // Create a map entry for the market if it doesn't exist
      if (!elementsMap.priorityElementsMap[priorityIn])
        elementsMap.priorityElementsMap[priorityIn] = [];

      // Store the element, placeholder and index in the map
      elementsMap.priorityElementsMap[priorityIn].push({ placeholder, element, clone });
    } else if (priorityIn !== market && elementsMap.priorityElementsMap[priorityIn]) {
      // Replace all the placeholders with the original elements
      elementsMap.priorityElementsMap[priorityIn].forEach(({ placeholder, element }) =>
        placeholder.replaceWith(element)
      );
      delete elementsMap.priorityElementsMap[priorityIn];
    }
  });
};
