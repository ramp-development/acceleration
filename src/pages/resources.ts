export const resources = () => {
  console.log('resources');

  const filtersWrapper = document.querySelector('[fs-cmsfilter-element="filters"]');
  const filters = [...filtersWrapper?.querySelectorAll('input')];
  filters.forEach((filter) => {
    const name = filter.dataset.inputName;
    const id = name.toLowerCase().replace(/\s+/g, '-');
    filter.name = name;
    filter.id = id;

    const label = filter.nextElementSibling;
    label.setAttribute('for', filter.id);
  });

  const dropdowns = [...document.querySelectorAll('[data-filter="dropdown"]')];
  dropdowns.forEach((dropdown) => {
    const textToggle = dropdown.querySelector('[data-filter-toggle="text"]'),
      selectToggle = dropdown.querySelector('[data-filter-toggle="select"]'),
      selectedToggle = dropdown.querySelector('[data-filter-toggle="selected"]'),
      additionalToggle = dropdown.querySelector('[data-filter-toggle="additional"]'),
      toggles = [textToggle, selectToggle, selectedToggle, additionalToggle];

    const filters = [...dropdown.querySelectorAll('input')];

    filters.forEach((filter) => {
      filter.addEventListener('change', (event) => {
        toggles.forEach((toggle) => (toggle.style.display = 'none'));

        const selected = [...dropdown.querySelectorAll('input:checked')];
        const selectedValues = selected.map((input) => input.dataset.inputName);

        console.log(selectedValues);

        if (selectedValues.length === 0) {
          textToggle.style.display = 'block';
        } else if (selectedValues.length === 1) {
          selectedToggle.textContent = selectedValues[0];
          selectedToggle.style.display = 'inline';
        } else if (selectedValues.length > 1) {
          selectedToggle.textContent = `${selectedValues[0]}, `;
          selectedToggle.style.display = 'inline';

          additionalToggle.textContent = `+${selectedValues.length - 1}`;
          additionalToggle.style.display = 'inline';
        }
      });
    });
  });
};
