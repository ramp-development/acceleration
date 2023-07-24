import type { MarketSensitiveElement } from '../classes/marketSensitiveElement';
import type { Market } from '../type';

export const handleMarketSensitiveElements = (
  market: Market,
  elements: MarketSensitiveElement[]
) => {
  elements.forEach((element) => element.updateVisibilityForMarket(market));
};
