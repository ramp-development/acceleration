import { createElementPlaceholder } from '../utils/createElementPlaceholder';
import { removedElementsMap } from '../utils/removedElementsMap';

/**
 * Handles the visibility of elements based on the selected market and attributes applied
 *
 * @param market - The current market
 * @param elements - A list of elements to dynamically hide and show based on the market
 * @param visible - Whether the elements should be visible or not during the given market, the opposite will be applied elsewhere
 */
export const handleMarketVisibility = (
  market: string,
  elements: HTMLDivElement[],
  visible: boolean
): void => {
  elements.forEach((element) => {
    const { showIn } = element.dataset;
    if (!showIn) return;

    // If the element is global, always show it
    if (showIn === 'Global') return;

    // If there are elements for the selected market, show and sort them otherwise remove and store them
    if (showIn === market && removedElementsMap[market]) {
      removedElementsMap[market].forEach(({ placeholder, element }) => {
        placeholder.replaceWith(element);
      });
      delete removedElementsMap[market]; // Clear the map entry for this market
    } else if (showIn !== market) {
      // create a placeholder and replace the element to be removed with it
      const placeholder = createElementPlaceholder(element, showIn);
      element.replaceWith(placeholder);

      // create a map entry for the market if it doesn't exist
      if (!removedElementsMap[showIn]) removedElementsMap[showIn] = [];

      // store the element and its placeholder in the map
      const originalIndex = Array.from(element.parentElement?.children || []).indexOf(element);
      removedElementsMap[showIn].push({ placeholder, element, originalIndex });
    }
  });
};
