import { restartWebflow } from '@finsweet/ts-utils';

import type { MarketSensitiveElement } from '../classes/marketSensitiveElement';
import type { Market } from '../type';
import { shiftPage } from '../utils/shiftPage';

export const handleMarketSensitiveElements = (
  market: Market,
  elements: MarketSensitiveElement[]
) => {
  elements.forEach((element) => element.updateVisibilityForMarket(market));

  restartWebflow();
  shiftPage();
};
