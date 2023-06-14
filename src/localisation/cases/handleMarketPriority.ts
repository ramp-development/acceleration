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
    if (priorityIn === market) {
      // Get the order in which the element should be prioritized and the parent element
      const { priorityOrder } = element.dataset;
      const parent = element.parentElement;
      if (!priorityOrder || !parent) return;
      placeElementAt(parent, element, Number(priorityOrder) - 1);
    }
  });
};
