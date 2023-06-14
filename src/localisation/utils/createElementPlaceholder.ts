/**
 * Converts an HTML element to a comment node that contains the market info
 */
export const createElementPlaceholder = (element: HTMLElement, market: string): Comment => {
  return document.createComment(`Placeholder for element with market: ${market}`);
};
