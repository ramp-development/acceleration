import type { Market } from '../type';
import { createElementPlaceholder } from '../utils/createElementPlaceholder';
import { fetchMarketContent } from '../utils/fetchMarketContent';
import { placeElementAt } from '../utils/placeElementAt';

export class MarketSensitiveElement {
  private element: HTMLElement;
  private targetFor: string[];
  private showIn: string[];
  private hideIn: string[];
  private priorityIn: string | null;
  private priorityOrder: number | null;
  private isVisible: boolean;
  private placeholder: Comment;
  private clone: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;

    const { targetFor } = this.element.dataset;
    this.targetFor = targetFor ? targetFor.split(', ') : [];

    const { showIn } = this.element.dataset;
    this.showIn = showIn ? showIn.split(', ') : [];

    const { hideIn } = this.element.dataset;
    this.hideIn = hideIn ? hideIn.split(', ') : [];

    const { priorityIn } = this.element.dataset;
    this.priorityIn = priorityIn ?? null;

    const priorityOrderAttr = this.element.getAttribute('data-priority-order');
    this.priorityOrder = priorityOrderAttr ? Number(priorityOrderAttr) : null;

    this.isVisible = true;

    this.placeholder = createElementPlaceholder();

    this.clone = this.element.cloneNode(true) as HTMLElement;
  }

  // Private method to show the element
  private showElement() {
    this.placeholder.replaceWith(this.element);
    this.isVisible = true;
  }

  // Private method to hide the element
  private hideElement() {
    this.element.replaceWith(this.placeholder);
    this.isVisible = false;
  }

  // Public method to fetch the market content for the element
  private targetForMarket(market: Market) {
    fetchMarketContent(market.link)
      .then((doc) => {
        const childElements = this.targetFor.map((targetElementValue) => {
          const element = doc.querySelector<HTMLDivElement>(
            `[data-child-for="${targetElementValue}"]`
          );
          return { parent: targetElementValue, element };
        });

        // Find the parent elements on page and replace their child content with the new content
        childElements.forEach(({ parent, element }) => {
          const parentElement = document.querySelector<HTMLDivElement>(
            `[data-target-for="${parent}"]`
          );
          if (parentElement && element) {
            parentElement.replaceChildren(element);
          }
        });
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  }

  // Private method to determine if the element is shown in a given market
  private showInMarket(market: string) {
    if (this.showIn.includes('Global') && !this.element.dataset.override) return;
    const shouldShow = this.showIn.includes(market);
    if (shouldShow && !this.isVisible) {
      this.showElement();
    } else if (!shouldShow && this.isVisible) {
      this.hideElement();
    }
  }

  // Private method to determine if the element is hiden in a given market
  private hideInMarket(market: string) {
    const shouldHide = this.hideIn.includes(market);
    if (shouldHide && this.isVisible) {
      this.hideElement();
    } else if (!shouldHide && !this.isVisible) {
      this.showElement();
    }
  }

  // Private method to prioritise the element in a given market
  private prioritiseInMarket(market: string) {
    const shouldPrioritise = this.priorityIn === market;
    if (shouldPrioritise) {
      const { parentElement } = this.element;
      if (!parentElement) return;
      this.clone = this.element.cloneNode(true) as HTMLElement;
      this.element.replaceWith(this.placeholder);

      if (this.priorityOrder) {
        placeElementAt(parentElement, this.clone, this.priorityOrder - 1);
      } else {
        parentElement.prepend(this.clone);
      }
    } else {
      this.clone.remove();
      this.placeholder.replaceWith(this.element);
    }

    document.dispatchEvent(new CustomEvent('refreshSplide'));
  }

  // Global method to update the visibility of the element in a given market
  updateVisibilityForMarket(market: Market) {
    if (this.targetFor.length > 0) this.targetForMarket(market);
    if (this.showIn.length > 0) this.showInMarket(market.id);
    if (this.hideIn.length > 0) this.hideInMarket(market.id);
    if (this.priorityIn) this.prioritiseInMarket(market.id);
  }
}
