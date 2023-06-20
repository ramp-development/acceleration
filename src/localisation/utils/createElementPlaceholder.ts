/**
 * Converts an HTML element to a comment node that contains the market info
 */
export const createElementPlaceholder = (
  element: HTMLElement,
  type: 'hiden' | 'shown' | 'prioritised',
  market: string
): Comment => {
  return document.createComment(`* placeholder * element to be ${type} in ${market}`);
};
