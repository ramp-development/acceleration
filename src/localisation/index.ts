import { queryElement } from '../utils/queryElement';
import { queryElements } from '../utils/queryElements';
import { LanguageOption } from './classes/languageOptions';
import { MarketSensitiveElement } from './classes/marketSensitiveElement';
import { handleLangSensitiveElements } from './market/handleLangSensitiveElements';
import { handleMarketParameter } from './market/handleMarketParamter';
import { handleMarketSensitiveElements } from './market/handleMarketSensitiveElements';
import { handleMirrorElements } from './market/handleMirrorElements';
import type { Language, Market } from './type';
import { applyMarket } from './utils/applyMarket';

export const localisation = (): void => {
  // Get references to the switcher, market and language elements
  const attr = 'data-localise';
  const switcherLangs = queryElements<HTMLDivElement>(`[${attr}="switcher-lang"]`);
  const switcherIcons = queryElements<HTMLImageElement>(`[${attr}="switcher-icon"]`);
  const marketWrapper = queryElement<HTMLDivElement>(`[${attr}="market-wrapper"]`);
  const marketSelect = queryElement<HTMLSelectElement>(`[${attr}="market-select"]`, marketWrapper);
  const marketList = queryElement<HTMLDivElement>(`[${attr}="market-list"]`);
  const langWrapper = queryElement<HTMLDivElement>(`[${attr}="lang-wrapper"]`);
  const langSelect = queryElement<HTMLSelectElement>(`[${attr}="lang-select"]`, langWrapper);

  // Stop execution if necessary elements are not found
  if (!switcherLangs.length || !switcherIcons.length) return;
  if (!marketSelect || !marketList) return;
  if (!langWrapper || !langSelect) return;

  // Create a markets array from the links found within the market list
  const marketLinks = queryElements<HTMLAnchorElement>('[data-localise="market-link"]', marketList);
  const marketIcons = queryElements<HTMLImageElement>('[data-localise="market-icon"]', marketList);
  const markets = marketLinks.map(
    (marketLink, index): Market => ({
      id: marketLink.textContent ?? '',
      link: marketLink.href,
      langCodes: marketLink.dataset?.langCodes?.split(', ') ?? [],
      icon: marketIcons[index],
    })
  );

  // Get all markets that have multiple languages available
  const multiLanguageMarkets = markets
    .filter((market) => market.langCodes.length > 1)
    .map((market) => market.id)
    .join(', ');

  // Set the data attributes for the selector languages
  switcherLangs.forEach((switcherLang) => {
    switcherLang.dataset.showIn = multiLanguageMarkets;
  });

  // Initialise the languages
  // Create an array of languages to be added to the dropdown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  declare const Weglot: any;
  const weglotLangs: Language[] = [
    {
      code: Weglot.options.language_from,
      name: Weglot.getLanguageName(Weglot.options.language_from),
    },
    ...Weglot.options.languages.map((language: { language_to: string }) => {
      return { code: language.language_to, name: Weglot.getLanguageName(language.language_to) };
    }),
  ];

  // Create an array of language options to be added to the dropdown
  const langOptions = weglotLangs.map(({ code, name }) => new LanguageOption(code, name));
  langOptions.forEach((langOption) => {
    langOption.appendTo(langSelect);
  });

  // Get the langCode from session storage
  const langCode = sessionStorage.getItem('langCode') ?? markets[0].langCodes[0];
  sessionStorage.setItem('langCode', langCode);
  langSelect.value = langCode;
  Weglot.switchTo(langCode);

  // Get all elements that are market-sensitive
  const marketSensitiveElements = queryElements<HTMLDivElement>(
    '[data-target-for], [data-show-in], [data-hide-in], [data-priority-in]'
  )
    .map((element) => new MarketSensitiveElement(element as HTMLElement))
    .reverse();

  // Get mirror elements
  const mirrorElements = queryElements<HTMLDivElement>('[data-localise="mirror-market"]');

  marketSelect.addEventListener('marketSelectReady', () => {
    // Adding an event listener to update the UI when market selection changes
    marketSelect.addEventListener('change', (event) => {
      // Get the current market value and find the corresponding market object
      const { value } = event.target as HTMLSelectElement;
      const market = markets.find((market) => market.id === value) as Market;
      if (!market) return;

      handleMarketParameter(market.id);
      handleLangSensitiveElements(market, langOptions, langWrapper);
      handleMarketSensitiveElements(market, marketSensitiveElements);
      handleMirrorElements(market.id, mirrorElements);

      switcherIcons.forEach((selectorIcon) => {
        // selectorIcon.src = market.icon.src;
        // selectorIcon.alt = market.icon.alt;
        selectorIcon.textContent = market.icon.textContent;
      });
    });

    // Apply the market from the query parameter or local storage
    applyMarket(marketSelect);

    // Handling initial market-specific visibility of elements if necessary
    const market = markets.find((market) => market.id === marketSelect.value) as Market;
    if (market === markets[0]) {
      handleLangSensitiveElements(market, langOptions, langWrapper);
      handleMarketSensitiveElements(market, marketSensitiveElements);
    }
  });

  langSelect.addEventListener('change', (event) => {
    const { value } = event.target as HTMLSelectElement;
    sessionStorage.setItem('langCode', value);
    Weglot.switchTo(value);
  });

  // dispatch event once the market select element is ready
  const numberOfMarkets = markets.length;
  if (marketSelect.options.length === numberOfMarkets) {
    const event = new Event('marketSelectReady');
    marketSelect.dispatchEvent(event);
  } else {
    const observer = new MutationObserver((mutationsList, observer) => {
      if (marketSelect.options.length === markets.length) {
        observer.disconnect();
        const event = new Event('marketSelectReady');
        marketSelect.dispatchEvent(event);
      }
    });

    observer.observe(marketSelect, { childList: true });
  }
};
