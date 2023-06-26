/**
 * A function that sets the text of given elements to the current market
 * @param market - The current market string
 * @param elements - The elements to reflect the current market
 */

export const handleMirrorElements = (market: string, elements: HTMLElement[]): void => {
  elements.forEach((element) => {
    element.textContent = market;
  });
};
