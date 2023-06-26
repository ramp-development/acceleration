// Function to manage resource filters and dropdowns
export const dropdowns = (): void => {
  // Convert NodeList of dropdown elements to an array
  const dropdowns = Array.from(document.querySelectorAll<HTMLElement>('[data-filter="dropdown"]'));

  // Loop over each dropdown
  dropdowns.forEach((dropdown) => {
    // Get references to the toggle elements within the dropdown
    const textToggle = dropdown.querySelector<HTMLElement>('[data-filter-toggle="text"]');
    const selectToggle = dropdown.querySelector<HTMLElement>('[data-filter-toggle="select"]');
    const selectedToggle = dropdown.querySelector<HTMLElement>('[data-filter-toggle="selected"]');
    const additionalToggle = dropdown.querySelector<HTMLElement>(
      '[data-filter-toggle="additional"]'
    );
    const toggles = [textToggle, selectToggle, selectedToggle, additionalToggle];

    // Convert NodeList of filter inputs within dropdown to an array
    const filters = Array.from(dropdown.querySelectorAll<HTMLInputElement>('input'));

    // Loop over each filter input
    filters.forEach((filter) => {
      // Listen for change events on each filter input
      filter.addEventListener('change', () => {
        // By default, hide all toggle elements
        toggles.forEach((toggle) => {
          if (toggle) {
            toggle.style.display = 'none';
          }
        });

        // Get array of selected filter inputs within dropdown
        const selected = Array.from(dropdown.querySelectorAll<HTMLInputElement>('input:checked'));

        // Map selected filter inputs to an array of their names from dataset, filtering out any falsy values
        const selectedValues = selected.map((input) => input.dataset.inputName).filter(Boolean);

        // If no filter inputs are selected, show the textToggle
        if (selectedValues.length === 0) {
          if (textToggle) textToggle.style.display = 'block';
        }
        // If only one filter input is selected, show the selectedToggle with the selected value
        else if (selectedValues.length === 1) {
          if (selectedToggle) {
            selectedToggle.textContent = selectedValues[0];
            selectedToggle.style.display = 'inline';
          }
        }
        // If more than one filter input is selected, show the selectedToggle with the first selected value
        // and show the additionalToggle with the count of additional selected values
        else if (selectedValues.length > 1) {
          if (selectedToggle) {
            selectedToggle.textContent = `${selectedValues[0]}, `;
            selectedToggle.style.display = 'inline';
          }
          if (additionalToggle) {
            additionalToggle.textContent = `+${selectedValues.length - 1}`;
            additionalToggle.style.display = 'inline';
          }
        }
      });
    });
  });
};
