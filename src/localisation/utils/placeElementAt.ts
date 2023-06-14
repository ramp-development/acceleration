/**
 * Places and renders an HTMLElement at a given index in a parent element.
 *
 * @param parent - The parent HTML element.
 * @param element - The HTML element to be inserted.
 * @param index - The index at which the element should be inserted.
 */
export const placeElementAt = (parent: HTMLElement, element: HTMLElement, index: number): void => {
  // Ensure the index is within bounds
  index = Math.max(0, Math.min(index, parent.children.length));

  // If index is the last, append element at the end
  if (index === parent.children.length) {
    parent.appendChild(element);
  } else {
    // Otherwise, insert the element before the child at the given index
    parent.insertBefore(element, parent.children[index]);
    const newIndex = [...parent.childNodes].indexOf(element);
    if (newIndex !== index) {
      parent.insertBefore(element, parent.children[index]);
    }
  }
};
