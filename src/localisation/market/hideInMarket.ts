import { createElementPlaceholder } from '../utils/createElementPlaceholder';
import { elementsMap } from '../utils/elementsMap';

/**
 * Handles the visibility of elements based on the selected market and attributes applied
 *
 * @param market - The current market
 * @param elements - A list of elements to dynamically hide and show based on the market
 * @param visible - Whether the elements should be visible or not during the given market, the opposite will be applied elsewhere
 */
export const hideInMarket = (market: string, elements: HTMLDivElement[]): void => {
  elements.forEach((element) => {
    const hideInMarkets = element.dataset.hideIn?.split(', ') ?? [];
    if (!hideInMarkets.length) return;

    hideInMarkets.forEach((hideIn) => {
      if (hideIn === '') return;

      if (hideIn === market) {
        // create a placeholder and replace the element to be removed with it
        const placeholder = createElementPlaceholder(element, 'hiden', hideIn);
        element.replaceWith(placeholder);

        // create a map entry for the market if it doesn't exist
        if (!elementsMap.hideElementsMap[hideIn]) elementsMap.hideElementsMap[hideIn] = [];

        // store the element, placeholder and index in the map
        elementsMap.hideElementsMap[hideIn].push({ placeholder, element });
      } else if (hideIn !== market && elementsMap.hideElementsMap[hideIn]) {
        // replace the placeholder with the element and remove from the map
        // Replace all the placeholders with the original elements
        elementsMap.hideElementsMap[hideIn].forEach(({ placeholder, element }) =>
          placeholder.replaceWith(element)
        );
        delete elementsMap.hideElementsMap[hideIn];
      }
    });
  });
};
