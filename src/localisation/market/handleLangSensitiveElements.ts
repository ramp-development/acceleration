import type { LanguageOption } from '../classes/languageOptions';
import type { Market } from '../type';

/**
 * A function that updates the available language options and the language wrapper styles based on the current market
 * @param market - The current market
 * @param languageOptions - The language options
 * @param langWrapper - The language wrapper
 */
export const handleLangSensitiveElements = (
  market: Market,
  languageOptions: LanguageOption[],
  langWrapper: HTMLDivElement
) => {
  // Update the visibility of the language options
  languageOptions.forEach((languageOption) => {
    languageOption.updateVisibilityForMarket(market);
  });

  // Update the language wrapper styles
  if (market.langCodes.length <= 1) {
    langWrapper.style.opacity = '0.3';
    langWrapper.style.pointerEvents = 'none';
  } else {
    langWrapper.style.removeProperty('opacity');
    langWrapper.style.removeProperty('pointer-events');
  }
};
