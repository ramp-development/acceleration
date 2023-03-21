"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/initCopyURL.ts
  var initCopyURL = () => {
    const URL = window.location.href;
    const copyURLs = [...document.querySelectorAll("[data-copy-url]")];
    copyURLs.forEach((copyURL) => {
      copyURL.addEventListener("click", () => {
        navigator.clipboard.writeText(URL);
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
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: `top ${top}`,
            end: `bottom ${top}`,
            scrub: true
          }
        });
        headerTl.to(targets, { opacity: 0.15, duration: 1 });
        items.forEach((item, index) => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 50%",
              end: "bottom 50%",
              scrub: true
            }
          });
          const target = targets.find((target2) => target2.classList.contains(`is-${index + 1}`));
          timeline.to(target, { opacity: 1, duration: 1 });
          timeline.to(target, { opacity: 0.15, duration: 1 }, "<2");
        });
      });
    }
  };

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    console.log("index");
    const { pathname } = window.location;
    switch (pathname) {
      case "/services":
        services();
        break;
      case "/resources":
        resources();
        break;
    }
    const hasSplide = document.querySelector(".splide");
    if (hasSplide)
      initSplide();
    const hasCopyURL = document.querySelector("[data-copy-url]");
    if (hasCopyURL)
      initCopyURL();
  });
})();
//# sourceMappingURL=index.js.map
