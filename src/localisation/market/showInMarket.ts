import { createElementPlaceholder } from '../utils/createElementPlaceholder';
import { elementsMap } from '../utils/elementsMap';

/**
 * Handles the visibility of elements based on the selected market and attributes applied
 *
 * @param market - The current market
 * @param elements - A list of elements to dynamically hide and show based on the market
 * @param visible - Whether the elements should be visible or not during the given market, the opposite will be applied elsewhere
 */
export const showInMarket = (market: string, elements: HTMLDivElement[]): void => {
  elements.forEach((element) => {
    const showInMarkets = element.dataset.showIn?.split(',') ?? [];
    if (!showInMarkets.length) return;

    showInMarkets.forEach((showIn) => {
      // If the element is global, always show it
      if (showIn === 'Global') return;

      // If showIn is the current market and there are elements for the selected market, show the elements
      // otherwise remove and store them
      if (showIn === market && elementsMap.showElementsMap[market]) {
        // Replace all the placeholders with the original elements
        elementsMap.showElementsMap[market].forEach(({ placeholder, element }) =>
          placeholder.replaceWith(element)
        );
        delete elementsMap.showElementsMap[market];
      } else if (showIn !== market && !elementsMap.showElementsMap[showIn]) {
        // create a placeholder and replace the element to be removed with it
        const placeholder = createElementPlaceholder(element, market);
        element.replaceWith(placeholder);

        // create a map entry for the market if it doesn't exist
        if (!elementsMap.showElementsMap[showIn]) elementsMap.showElementsMap[showIn] = [];

        // store the element, placeholder and index in the map
        elementsMap.showElementsMap[showIn].push({ placeholder, element });
      }
    });
  });
};
