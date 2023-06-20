import type { CMSFilters } from '../../types/CMSFilters';
import type { Job } from './job';

export const jobs = () => {
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
      const newItems = jobs.map((job: Job) => createItem(job, itemTemplateElement));

      // Populate the list
      await listInstance.addItems(newItems);

      // Get the filter lists
      const filterLists = filtersInstance.form.querySelectorAll<HTMLDivElement>(
        '[data-element="filter-list"]'
      );

      // Loop through each filter list
      for (const filterList of filterLists) {
        // Get the template filter
        const filterTemplateElement =
          filterList.querySelector<HTMLLabelElement>('[data-element="filter"]');
        if (!filterTemplateElement) return;

        // Get the parent wrapper
        const filtersWrapper = filterTemplateElement.parentElement;
        if (!filtersWrapper) return;

        // Remove the template from the DOM
        filterTemplateElement.remove();

        // Collect the required property
        const { property } = filterList.dataset;
        if (!property) return;
        const propertyValues = collectProperties(jobs, property as keyof Job);

        // Create the new filters and append the to the parent wrapper
        for (const propertyValue of propertyValues) {
          const newFilter = createFilter(propertyValue as keyof Job, filterTemplateElement);
          if (!newFilter) continue;

          filtersWrapper.append(newFilter);
        }
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
    const config = {
      emea: {
        api: 'groupmemea_jobfeedapi_key',
        sc: 'a1d19b3f3a21cdde1558794436300152',
        subsidiaryName: 'Acceleration',
      },
      northAmerica: {
        api: 'groupmnorthamerica_jobfeedapi_key',
        sc: '60497c5c1cfa4d58341ec4060be40b2f',
        subsidiaryName: 'GroupM%20Nexus%20Acceleration',
      },
    };

    const endpoints: string[] = [];
    Object.values(config).forEach((value) => {
      endpoints.push(
        `https://api.jobvite.com/api/v2/job?api=${value.api}&sc=${value.sc}&subsidiaryName=${value.subsidiaryName}`
      );
    });

    const promises = endpoints.map((endpoint) => fetch(endpoint));

    return Promise.all(promises)
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((data) => {
        const combinedList = data.reduce((acc, curr) => acc.concat(curr.requisitions), []);
        return combinedList;
      })
      .catch((error) => {
        console.error(error);
      });
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
    if (description) description.textContent = job.briefDescription;
    if (country) country.textContent = job.location;
    if (department) department.textContent = job.category;
    if (apply) apply.href = job.detailLink;

    return newItem;
  };

  /**
   * Collects all values for a given property from the jobs data.
   * @param jobs The jobs data.
   * @param property The property to collect.
   *
   * @returns An array of {@link Job} countries.
   */
  const collectProperties = <K extends keyof Job>(jobs: Job[], property: K) => {
    const propertySet: Set<Job[K]> = new Set();

    for (const job of jobs) {
      propertySet.add(job[property]);
    }

    return [...propertySet];
  };

  /**
   * Creates a new checkbox from the template element.
   * @param category The filter value.
   * @param templateElement The template element.
   *
   * @returns A new checkbox filter.
   */
  const createFilter = <V extends keyof Job>(
    propertyValue: V,
    templateElement: HTMLLabelElement
  ) => {
    // Clone the template element
    const newFilter = templateElement.cloneNode(true) as HTMLLabelElement;

    // Query inner elements
    const label = newFilter.querySelector('span');
    const radio = newFilter.querySelector('input');

    if (!label || !radio) return;

    // Populate inner elements
    label.textContent = propertyValue;
    radio.value = propertyValue;

    return newFilter;
  };
};
