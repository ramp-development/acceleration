// Function to manage resource filters and dropdowns
export const filters = (): void => {
  // Get reference to the filters wrapper element
  const filtersWrapper = document.querySelector<HTMLElement>('[fs-cmsfilter-element="filters"]');

  // If no filters wrapper is found, stop function execution
  if (!filtersWrapper) return;

  // Convert NodeList of input elements within filtersWrapper to an array
  const filters = Array.from(filtersWrapper.querySelectorAll<HTMLInputElement>('input'));

  // Loop over each filter input
  filters.forEach((filter) => {
    // Extract input name from dataset
    const name = filter.dataset.inputName;

    // If no name is found in dataset, skip this iteration
    if (!name) return;

    // Generate id by transforming the name to lower case and replacing spaces with hyphens
    const id = name.toLowerCase().replace(/\s+/g, '-');

    // Set the name and id of the filter input
    filter.name = name;
    filter.id = id;

    // Get reference to the label that is the next sibling of the filter input
    const label = filter.nextElementSibling as HTMLLabelElement;

    // If label exists, set its 'for' attribute to link it to the filter input
    if (label) {
      label.setAttribute('for', filter.id);
    }
  });
};
