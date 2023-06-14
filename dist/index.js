"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/initCopyURL.ts
  var initCopyURL = () => {
    const URL2 = window.location.href;
    const copyURLs = [...document.querySelectorAll("[data-copy-url]")];
    copyURLs.forEach((copyURL) => {
      copyURL.addEventListener("click", () => {
        navigator.clipboard.writeText(URL2);
      });
    });
  };

  // src/utils/createElement.ts
  var createElement = (type, location2, options = {}) => {
    const element = document.createElement(type);
    Object.entries(options).forEach(([key, value]) => {
      if (key === "class") {
        element.classList.add(value);
        return;
      }
      if (key === "dataset") {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
        return;
      }
      if (key === "text") {
        element.textContent = value;
        return;
      }
      if (key === "callback") {
        element.onload = value;
        return;
      }
      element.setAttribute(key, value);
    });
    location2.appendChild(element);
    return element;
  };

  // src/utils/initSplide.ts
  var initSplide = () => {
    createElement("script", document.head, {
      src: "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js",
      callback: init
    });
    function init() {
      const sliders = [...document.querySelectorAll(".splide")];
      sliders.forEach((slider) => {
        const component = new Splide(slider, {
          type: "loop",
          gap: "2.5rem",
          perPage: 3,
          perMove: 1,
          breakpoints: {
            991: {
              perPage: 2,
              gap: "2.5rem"
            },
            767: {
              perPage: 1,
              gap: "2.5rem"
            }
          }
        });
        component.mount();
      });
    }
  };

  // src/localisation/cases/handleMarketParamter.ts
  var handleMarketParameter = (value) => {
    const urlObject = new URL(window.location.href);
    urlObject.searchParams.set("market", value);
    history.pushState({}, "", urlObject.toString());
    sessionStorage.setItem("market", value);
  };

  // src/localisation/utils/placeElementAt.ts
  var placeElementAt = (parent, element, index) => {
    index = Math.max(0, Math.min(index, parent.children.length));
    if (index === parent.children.length) {
      parent.appendChild(element);
    } else {
      parent.insertBefore(element, parent.children[index]);
      const newIndex = [...parent.childNodes].indexOf(element);
      if (newIndex !== index) {
        parent.insertBefore(element, parent.children[index]);
      }
    }
  };

  // src/localisation/cases/handleMarketPriority.ts
  var handleMarketPriority = (market, elements) => {
    elements.forEach((element) => {
      const { priorityIn } = element.dataset;
      if (priorityIn === market) {
        const { priorityOrder } = element.dataset;
        const parent = element.parentElement;
        if (!priorityOrder || !parent)
          return;
        placeElementAt(parent, element, Number(priorityOrder) - 1);
      }
    });
  };

  // src/localisation/utils/fetchMarketContent.ts
  var fetchMarketContent = (link) => {
    return fetch(link).then((response) => response.text()).then((html) => {
      const parser = new DOMParser();
      return parser.parseFromString(html, "text/html");
    });
  };

  // src/localisation/cases/handleMarketTargets.ts
  var handleMarketTargets = (market, elements) => {
    const targetElementValues = elements.map((target) => target.dataset.targetFor);
    fetchMarketContent(market.link).then((doc) => {
      const childElements = targetElementValues.map((targetElementValue) => {
        const element = doc.querySelector(
          `[data-child-for="${targetElementValue}"]`
        );
        return { parent: targetElementValue, element };
      });
      childElements.forEach(({ parent, element }) => {
        const parentElement = document.querySelector(
          `[data-target-for="${parent}"]`
        );
        if (parentElement && element) {
          parentElement.replaceChildren(element);
        }
      });
    }).catch((error) => console.error(error));
  };

  // src/localisation/utils/createElementPlaceholder.ts
  var createElementPlaceholder = (element, market) => {
    return document.createComment(`Placeholder for element with market: ${market}`);
  };

  // src/localisation/utils/removedElementsMap.ts
  var removedElementsMap = {};

  // src/localisation/cases/handleMarketVisibility.ts
  var handleMarketVisibility = (market, elements, visible) => {
    elements.forEach((element) => {
      const { showIn } = element.dataset;
      if (!showIn)
        return;
      if (showIn === "Global")
        return;
      if (showIn === market && removedElementsMap[market]) {
        removedElementsMap[market].forEach(({ placeholder, element: element2 }) => {
          placeholder.replaceWith(element2);
        });
        delete removedElementsMap[market];
      } else if (showIn !== market) {
        const placeholder = createElementPlaceholder(element, showIn);
        element.replaceWith(placeholder);
        if (!removedElementsMap[showIn])
          removedElementsMap[showIn] = [];
        const originalIndex = Array.from(element.parentElement?.children || []).indexOf(element);
        removedElementsMap[showIn].push({ placeholder, element, originalIndex });
      }
    });
  };

  // src/localisation/utils/applyMarket.ts
  var applyMarket = (marketSelect) => {
    const urlParams = new URLSearchParams(window.location.search);
    const marketParam = urlParams.get("market");
    const market = marketParam ? marketParam : sessionStorage.getItem("market");
    console.log(marketParam);
    console.log(sessionStorage.getItem("market"));
    console.log(market);
    if (!market)
      return;
    const optionExists = Array.from(marketSelect.options).some((option) => option.value === market);
    if (!optionExists)
      return;
    marketSelect.value = market;
    marketSelect.dispatchEvent(new Event("change"));
  };

  // src/localisation/utils/queryElements.ts
  var queryElements = (query, parent = document) => {
    const elements = parent.querySelectorAll(query);
    return elements.length ? [...elements] : [];
  };

  // src/localisation/index.ts
  var localisation = () => {
    const marketSelect = document.querySelector('[data-localise="market-select"]');
    const marketList = document.querySelector('[data-localise="market-list"]');
    const selectorLanguage = document.querySelector(
      '[data-localise="selector-language"]'
    );
    const selectorIcons = queryElements('[data-localise="selector-icon"]');
    if (!marketSelect || !marketList)
      return;
    if (!selectorLanguage || !selectorIcons.length)
      return;
    const marketLinks = queryElements('[data-localise="market-link"]', marketList);
    const marketIcons = queryElements('[data-localise="market-icon"]', marketList);
    const markets = marketLinks.filter((marketLink) => Boolean(marketLink.textContent)).map((marketLink, index) => ({
      id: marketLink.textContent,
      link: marketLink.href,
      icon: marketIcons[index]
    }));
    const targetElements = queryElements("[data-target-for]");
    const showInElements = queryElements("[data-show-in]");
    const hideInElements = queryElements("[data-hide-in]");
    const priorityInElements = queryElements(
      "[data-priority-in][data-priority-order]"
    );
    const elements = {
      targetElements,
      showInElements,
      priorityInElements,
      hideInElements
    };
    marketSelect.addEventListener("change", (event) => {
      const { value } = event.target;
      const market = markets.find((market2) => market2.id === value);
      if (!market)
        return;
      handleMarketParameter(market.id);
      handleMarketTargets(market, elements.targetElements);
      handleMarketVisibility(market.id, elements.showInElements, true);
      handleMarketVisibility(market.id, elements.hideInElements, false);
      handleMarketPriority(market.id, elements.priorityInElements);
      selectorIcons.forEach((selectorIcon) => {
        selectorIcon.src = market.icon.src;
        selectorIcon.alt = market.icon.alt;
      });
    });
    marketSelect.addEventListener("marketSelectReady", () => {
      applyMarket(marketSelect);
      handleMarketVisibility(marketSelect.value, elements.showInElements);
      handleMarketPriority(marketSelect.value, elements.priorityInElements);
    });
    const numberOfMarkets = markets.length;
    if (marketSelect.options.length === numberOfMarkets) {
      const event = new Event("marketSelectReady");
      marketSelect.dispatchEvent(event);
    } else {
      const observer = new MutationObserver((mutationsList, observer2) => {
        if (marketSelect.options.length === markets.length) {
          observer2.disconnect();
          const event = new Event("marketSelectReady");
          marketSelect.dispatchEvent(event);
        }
      });
      observer.observe(marketSelect, { childList: true });
    }
  };

  // src/pages/about.ts
  var about = () => {
    console.log("about");
    const selects = document.querySelectorAll("select");
    selects.forEach((select2) => {
      const { mirrorValue } = select2.dataset;
      let mirrorTarget = null;
      if (mirrorValue) {
        mirrorTarget = document.querySelector(
          `[data-mirror-target="${mirrorValue}"]`
        );
      }
      select2.addEventListener("change", (event) => {
        if (mirrorTarget) {
          let { value } = event.target;
          if (value === "")
            value = event.target.dataset.mirrorDefault ?? "";
          mirrorTarget.textContent = value;
        }
        setTimeout(() => {
          window.scrollBy(0, 1);
          window.scrollBy(0, -1);
        }, 200);
      });
    });
    const select = document.querySelector('select[name="Leadership"]');
    const markets = document.querySelectorAll(
      '.w-dyn-item [fs-cmsfilter-field="market"]'
    );
    const marketsArray = [];
    markets.forEach((market) => {
      if (market.textContent)
        marketsArray.push(market.textContent);
    });
    const marketsSet = new Set(marketsArray.sort());
    marketsSet.forEach((market) => {
      const option = new Option(market, market);
      if (select)
        select.add(option);
    });
  };

  // src/pages/careers/jobs.ts
  var jobs = () => {
    console.log("jobs");
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
      "cmsfilter",
      async (filtersInstances) => {
        const [filtersInstance] = filtersInstances;
        const { listInstance } = filtersInstance;
        const [firstItem] = listInstance.items;
        const itemTemplateElement = firstItem.element;
        const jobs2 = await fetchJobs();
        listInstance.clearItems();
        const newItems = jobs2.map((job) => createItem(job, itemTemplateElement));
        await listInstance.addItems(newItems);
        const filterLists = filtersInstance.form.querySelectorAll(
          '[data-element="filter-list"]'
        );
        for (const filterList of filterLists) {
          const filterTemplateElement = filterList.querySelector('[data-element="filter"]');
          if (!filterTemplateElement)
            return;
          const filtersWrapper = filterTemplateElement.parentElement;
          if (!filtersWrapper)
            return;
          filterTemplateElement.remove();
          const { property } = filterList.dataset;
          if (!property)
            return;
          const propertyValues = collectProperties(jobs2, property);
          for (const propertyValue of propertyValues) {
            const newFilter = createFilter(propertyValue, filterTemplateElement);
            if (!newFilter)
              continue;
            filtersWrapper.append(newFilter);
          }
        }
        filtersInstance.storeFiltersData();
      }
    ]);
    const fetchJobs = async () => {
      const config = {
        emea: {
          api: "groupmemea_jobfeedapi_key",
          sc: "a1d19b3f3a21cdde1558794436300152",
          subsidiaryName: "Acceleration"
        },
        northAmerica: {
          api: "groupmnorthamerica_jobfeedapi_key",
          sc: "60497c5c1cfa4d58341ec4060be40b2f",
          subsidiaryName: "GroupM%20Nexus%20Acceleration"
        }
      };
      const endpoints = [];
      Object.values(config).forEach((value) => {
        endpoints.push(
          `https://api.jobvite.com/api/v2/job?api=${value.api}&sc=${value.sc}&subsidiaryName=${value.subsidiaryName}`
        );
      });
      const promises = endpoints.map((endpoint) => fetch(endpoint));
      return Promise.all(promises).then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      }).then((data) => {
        const combinedList = data.reduce((acc, curr) => acc.concat(curr.requisitions), []);
        return combinedList;
      }).catch((error) => {
        console.error(error);
      });
    };
    const createItem = (job, templateElement) => {
      const newItem = templateElement.cloneNode(true);
      const title = newItem.querySelector('[data-job="title"]');
      const description = newItem.querySelector('[data-job="description"]');
      const country = newItem.querySelector('[data-job="country"]');
      const department = newItem.querySelector('[data-job="department"]');
      const apply = newItem.querySelector('[data-job="apply"]');
      if (title)
        title.textContent = job.title;
      if (description)
        description.textContent = job.briefDescription;
      if (country)
        country.textContent = job.location;
      if (department)
        department.textContent = job.category;
      if (apply)
        apply.href = job.detailLink;
      return newItem;
    };
    const collectProperties = (jobs2, property) => {
      const propertySet = /* @__PURE__ */ new Set();
      for (const job of jobs2) {
        propertySet.add(job[property]);
      }
      return [...propertySet];
    };
    const createFilter = (propertyValue, templateElement) => {
      const newFilter = templateElement.cloneNode(true);
      const label = newFilter.querySelector("span");
      const radio = newFilter.querySelector("input");
      if (!label || !radio)
        return;
      label.textContent = propertyValue;
      radio.value = propertyValue;
      return newFilter;
    };
  };

  // node_modules/.pnpm/@finsweet+ts-utils@0.39.0/node_modules/@finsweet/ts-utils/dist/helpers/simulateEvent.js
  var simulateEvent = (target, events) => {
    if (!Array.isArray(events))
      events = [events];
    const eventsSuccess = events.map((event) => target.dispatchEvent(new Event(event, { bubbles: true })));
    return eventsSuccess.every((success) => success);
  };

  // src/pages/careers/modals.ts
  var modals = () => {
    console.log("modals");
    let modalButtons = [...document.querySelectorAll("[data-modal-button]")];
    const modalTriggers = [...document.querySelectorAll("[data-modal-trigger]")];
    const arrowButtons = [...document.querySelectorAll(".splide__arrows")];
    arrowButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modalButtons = [...document.querySelectorAll("[data-modal-button]")];
        updateEventListeners();
      });
    });
    const updateEventListeners = () => {
      modalButtons.forEach((button) => {
        button.removeEventListener("click", openModal);
        button.addEventListener("click", openModal);
      });
    };
    const openModal = (event) => {
      const button = event.currentTarget;
      const modalSlug = button.dataset.modalButton;
      const modalTrigger = modalTriggers.find(
        (trigger) => trigger.dataset.modalTrigger === modalSlug
      );
      simulateEvent(modalTrigger, "click");
    };
    updateEventListeners();
  };

  // src/pages/careers/index.ts
  var careers = () => {
    jobs();
    modals();
  };

  // src/pages/resources.ts
  var resources = () => {
    console.log("resources");
    const filtersWrapper = document.querySelector('[fs-cmsfilter-element="filters"]');
    const filters = [...filtersWrapper?.querySelectorAll("input")];
    filters.forEach((filter) => {
      const name = filter.dataset.inputName;
      const id = name.toLowerCase().replace(/\s+/g, "-");
      filter.name = name;
      filter.id = id;
      const label = filter.nextElementSibling;
      label.setAttribute("for", filter.id);
    });
    const dropdowns = [...document.querySelectorAll('[data-filter="dropdown"]')];
    dropdowns.forEach((dropdown) => {
      const textToggle = dropdown.querySelector('[data-filter-toggle="text"]'), selectToggle = dropdown.querySelector('[data-filter-toggle="select"]'), selectedToggle = dropdown.querySelector('[data-filter-toggle="selected"]'), additionalToggle = dropdown.querySelector('[data-filter-toggle="additional"]'), toggles = [textToggle, selectToggle, selectedToggle, additionalToggle];
      const filters2 = [...dropdown.querySelectorAll("input")];
      filters2.forEach((filter) => {
        filter.addEventListener("change", (event) => {
          toggles.forEach((toggle) => toggle.style.display = "none");
          const selected = [...dropdown.querySelectorAll("input:checked")];
          const selectedValues = selected.map((input) => input.dataset.inputName);
          console.log(selectedValues);
          if (selectedValues.length === 0) {
            textToggle.style.display = "block";
          } else if (selectedValues.length === 1) {
            selectedToggle.textContent = selectedValues[0];
            selectedToggle.style.display = "inline";
          } else if (selectedValues.length > 1) {
            selectedToggle.textContent = `${selectedValues[0]},\xA0`;
            selectedToggle.style.display = "inline";
            additionalToggle.textContent = `+${selectedValues.length - 1}`;
            additionalToggle.style.display = "inline";
          }
        });
      });
    });
  };

  // src/pages/services.ts
  var services = () => {
    let numberLoaded = 0;
    createElement("script", document.head, {
      src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js",
      defer: true,
      callback: init
    });
    createElement("script", document.head, {
      src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js",
      defer: true,
      callback: init
    });
    const sticky = document.querySelector('[data-sticky="vertical-center"]');
    const top = `${(window.innerHeight - sticky.offsetHeight) / 2}px`;
    sticky.style.top = top;
    function init() {
      numberLoaded += 1;
      if (numberLoaded !== 2)
        return;
      gsap.registerPlugin(ScrollTrigger);
      const header = document.querySelector(".capabilities_header"), items = [...document.querySelectorAll(".capabilities_list-item")], targets = [...document.querySelectorAll(".capabilities_illustration")];
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        items.forEach((item, index) => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 1
            }
          });
          const target = targets.find((target2) => target2.classList.contains(`is-${index + 1}`));
          timeline.to(target, { opacity: 1, duration: 1 });
        });
      });
    }
  };

  // src/pages/index.ts
  var pages = () => {
    const { pathname } = window.location;
    switch (pathname) {
      case "/about-us":
        about();
        break;
      case "/services":
        services();
        break;
      case "/resources":
        resources();
        break;
      case "/careers":
        careers();
        break;
    }
  };

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    console.log("index");
    localisation();
    pages();
    const hasSplide = document.querySelector(".splide");
    if (hasSplide)
      initSplide();
    const hasCopyURL = document.querySelector("[data-copy-url]");
    if (hasCopyURL)
      initCopyURL();
  });
})();
//# sourceMappingURL=index.js.map
