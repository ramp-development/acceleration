import type { CMSFilters } from './types/CMSFilters';
import type { Job } from './types/job';

export const jobs = () => {
  console.log('jobs');

  /**
   * Populate CMS Data from an external API.
   */
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsfilter',
    async (filtersInstances: CMSFilters[]) => {
      const [filtersInstance] = filtersInstances;
      const { listInstance } = filtersInstance;
      const [firstItem] = listInstance.items;
      const itemTemplateElement = firstItem.element;

      // Fetch external data
      const jobs = await fetchJobs();

      // Remove existing items
      listInstance.clearItems();

      // Create the new items
      const newItems = jobs.map((job) => createItem(job, itemTemplateElement));

      // Populate the list
      await listInstance.addItems(newItems);

      // Get the template filter
      const filterTemplateElement =
        filtersInstance.form.querySelector<HTMLLabelElement>('[data-element="filter"]');
      if (!filterTemplateElement) return;

      // Get the parent wrapper
      const filtersWrapper = filterTemplateElement.parentElement;
      if (!filtersWrapper) return;

      // Remove the template from the DOM
      filterTemplateElement.remove();

      // Collect the categories
      const categories = collectCountries(jobs);

      // Create the new filters and append the to the parent wrapper
      for (const category of categories) {
        const newFilter = createFilter(category, filterTemplateElement);
        if (!newFilter) continue;

        filtersWrapper.append(newFilter);
      }

      // Sync the CMSFilters instance with the new created filters
      filtersInstance.storeFiltersData();
    },
  ]);

  /**
   * Fetches fake products from Fake Store API.
   * @returns An array of {@link Product}.
   */
  const fetchJobs = async () => {
    const URL = 'https://api.jobvite.com/api/v2/job';
    const api = 'groupmemea_jobfeedapi_key';
    const sc = 'a1d19b3f3a21cdde1558794436300152';
    const subsidiaryName = 'Acceleration';
    const endpoint = `${URL}?api=${api}&sc=${sc}&subsidiaryName=${subsidiaryName}`;

    try {
      const response = await fetch(endpoint);
      const data: Job[] = await response.json();

      return data.requisitions;
    } catch (error) {
      return [];
    }
  };

  /**
   * Creates an item from the template element.
   * @param product The product data to create the item from.
   * @param templateElement The template element.
   *
   * @returns A new Collection Item element.
   */
  const createItem = (job: Job, templateElement: HTMLDivElement) => {
    // Clone the template element
    const newItem = templateElement.cloneNode(true) as HTMLDivElement;

    // Query inner elements
    const title = newItem.querySelector<HTMLHeadingElement>('[data-job="title"]');
    const description = newItem.querySelector<HTMLDivElement>('[data-job="description"]');
    const country = newItem.querySelector<HTMLDivElement>('[data-job="country"]');
    const department = newItem.querySelector<HTMLDivElement>('[data-job="department"]');
    const apply = newItem.querySelector<HTMLAnchorElement>('[data-job="apply"]');

    // Populate inner elements
    if (title) title.textContent = job.title;
    if (description) description.textContent = job.description.replace(/<.*?>/g, '');
    if (country) country.textContent = job.location;
    if (department) department.textContent = job.category;
    if (apply) apply.href = job.applyLink;

    return newItem;
  };

  /**
   * Collects all the countries from the products' data.
   * @param products The products' data.
   *
   * @returns An array of {@link Job} countries.
   */
  const collectCountries = (jobs: Job[]) => {
    const categories: Set<Job['country']> = new Set();

    for (const { country } of jobs) {
      categories.add(country);
    }

    return [...categories];
  };

  /**
   * Creates a new radio filter from the template element.
   * @param category The filter value.
   * @param templateElement The template element.
   *
   * @returns A new category radio filter.
   */
  const createFilter = (category: Job['country'], templateElement: HTMLLabelElement) => {
    // Clone the template element
    const newFilter = templateElement.cloneNode(true) as HTMLLabelElement;

    // Query inner elements
    const label = newFilter.querySelector('span');
    const radio = newFilter.querySelector('input');

    if (!label || !radio) return;

    // Populate inner elements
    label.textContent = category;
    radio.value = category;

    return newFilter;
  };
};
