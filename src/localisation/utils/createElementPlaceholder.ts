/**
 * Converts an HTML element to a comment node that contains the market info
 * @returns - A comment node
 */
export const createElementPlaceholder = (): Comment => {
  return document.createComment(`* placeholder * for element`);
};
