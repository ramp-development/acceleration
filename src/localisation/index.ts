import { handleMarketParameter } from './cases/handleMarketParamter';
import { handleMarketPriority } from './cases/handleMarketPriority';
import { handleMarketTargets } from './cases/handleMarketTargets';
import { handleMarketVisibility } from './cases/handleMarketVisibility';
import type { LocalisedElements, Market } from './type';
import { applyMarket } from './utils/applyMarket';
import { queryElements } from './utils/queryElements';

export const localisation = () => {
  // Get references to the market select and the market list and selector elements
  const marketSelect = document.querySelector<HTMLSelectElement>('[data-localise="market-select"]');
  const marketList = document.querySelector<HTMLDivElement>('[data-localise="market-list"]');
  const selectorLanguage = document.querySelector<HTMLDivElement>(
    '[data-localise="selector-language"]'
  );
  const selectorIcons = queryElements<HTMLImageElement>('[data-localise="selector-icon"]');

  // Stop execution if necessary elements are not found
  if (!marketSelect || !marketList) return;
  if (!selectorLanguage || !selectorIcons.length) return;

  // Create a markets array from the links found within the market list
  const marketLinks = queryElements<HTMLAnchorElement>('[data-localise="market-link"]', marketList);
  const marketIcons = queryElements<HTMLImageElement>('[data-localise="market-icon"]', marketList);
  const markets = marketLinks
    .filter((marketLink) => Boolean(marketLink.textContent)) // Filter out marketLinks without textContent
    .map((marketLink, index) => ({
      id: marketLink.textContent,
      link: marketLink.href,
      icon: marketIcons[index],
    }));

  // Get target elements and their values for later usage
  const targetElements = queryElements<HTMLDivElement>('[data-target-for]');

  // Get showIn elements
  const showInElements = queryElements<HTMLDivElement>('[data-show-in]');
  const hideInElements = queryElements<HTMLDivElement>('[data-hide-in]');

  // Get priorityIn elements
  const priorityInElements = queryElements<HTMLDivElement>(
    '[data-priority-in][data-priority-order]'
  );

  // Group elements into one object
  const elements: LocalisedElements = {
    targetElements,
    showInElements,
    priorityInElements,
    hideInElements,
  };

  // Adding an event listener to update the UI when market selection changes
  marketSelect.addEventListener('change', (event) => {
    // Get the current market value and find the corresponding market object
    const { value } = event.target as HTMLSelectElement;
    const market = markets.find((market) => market.id === value) as Market;
    if (!market) return;

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

  marketSelect.addEventListener('marketSelectReady', () => {
    // Apply the market from the query parameter or local storage
    applyMarket(marketSelect);

    // Handling initial market-specific visibility of elements
    handleMarketVisibility(marketSelect.value, elements.showInElements);
    handleMarketPriority(marketSelect.value, elements.priorityInElements);
  });

  // dispatch event once the market select element is ready
  const numberOfMarkets = markets.length;
  if (marketSelect.options.length === numberOfMarkets) {
    const event = new Event('marketSelectReady');
    marketSelect.dispatchEvent(event);
  } else {
    // Create a MutationObserver to observe the market select element
    const observer = new MutationObserver((mutationsList, observer) => {
      // Check if the number of options in the select element has reached the target
      if (marketSelect.options.length === markets.length) {
        // Stop observing
        observer.disconnect();
        // Create and dispatch the event
        const event = new Event('marketSelectReady');
        marketSelect.dispatchEvent(event);
      }
    });

    // Start observing the select element with the configured parameters
    observer.observe(marketSelect, { childList: true });
  }
};
