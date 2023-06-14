import type { Market } from '../type';
import { fetchMarketContent } from '../utils/fetchMarketContent';

/**
 * Fetches the market data and updates the localized elements
 *
 * @param market - The current market
 * @param elements - A list of elements to dynamically update and replace content for
 */
export const handleMarketTargets = (market: Market, elements: HTMLDivElement[]): void => {
  // Get the values of the target elements to match up to on the market page
  const targetElementValues = elements.map((target) => target.dataset.targetFor);

  // Fetch the market data and find the corresponding elements
  fetchMarketContent(market.link)
    .then((doc) => {
      // find the relevant elements on the market page and return the parent and element itself
      const childElements = targetElementValues.map((targetElementValue) => {
        const element = doc.querySelector<HTMLDivElement>(
          `[data-child-for="${targetElementValue}"]`
        );
        return { parent: targetElementValue, element };
      });

      // Find the parent elements on page and replace their child content with the new content
      childElements.forEach(({ parent, element }) => {
        const parentElement = document.querySelector<HTMLDivElement>(
          `[data-target-for="${parent}"]`
        );
        if (parentElement && element) {
          parentElement.replaceChildren(element);
        }
      });
    })
    .catch((error) => console.error(error));
};
