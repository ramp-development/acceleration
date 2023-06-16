/**
 * Apply the global market to linked selects
 *
 * @param market - The current market
 * @param selects - A list of selects to update on change
 */
export const handleLinkedSelects = (market: string, selects: HTMLSelectElement[]) => {
  selects.forEach((select) => {
    select.value = market;
    select.dispatchEvent(new Event('change'));
  });

  window.scrollBy(0, 1);
  window.scrollBy(0, -1);
};
