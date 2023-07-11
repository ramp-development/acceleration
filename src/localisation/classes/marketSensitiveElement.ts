import type { Market } from '../type';
import { createElementPlaceholder } from '../utils/createElementPlaceholder';
import { fetchMarketContent } from '../utils/fetchMarketContent';
import { placeElementAt } from '../utils/placeElementAt';

export class MarketSensitiveElement {
  public element: HTMLElement;
  private targetFor: string[] = [];
  private showIn: string[] = [];
  private hideIn: string[] = [];
  private priorityIn: string | null;
  private priorityOrder: number | null;
  private isVisible: boolean;
  private placeholder: Comment;
  private clone: HTMLElement;
  private parseDataAttribute(attribute: string): string[] {
    const attr = this.element.dataset[attribute];
    return attr ? attr.split(', ') : [];
  }

  constructor(element: HTMLElement) {
    this.element = element;

    this.targetFor = this.parseDataAttribute('targetFor');
    this.showIn = this.parseDataAttribute('showIn');
    this.hideIn = this.parseDataAttribute('hideIn');

    const { priorityIn } = this.element.dataset;
    this.priorityIn = priorityIn ?? null;

    const priorityOrder = this.element.getAttribute('data-priority-order');
    this.priorityOrder = priorityOrder ? Number(priorityOrder) : null;

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
      // console.log('showing');
      this.showElement();
    } else if (!shouldShow && this.isVisible) {
      // console.log('hiding');
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
    // Figure if the element should be prioritised in the given market
    const shouldPrioritise = this.priorityIn === market;

    if (shouldPrioritise && market !== 'Global') {
      // Get the parent element of the element
      const { parentElement } = this.element;
      if (!parentElement) return;

      // Hide the element if it isn't already
      if (this.isVisible) this.hideElement();

      // Either place the element at a given index or as the first child
      if (this.priorityOrder) {
        placeElementAt(parentElement, this.clone, this.priorityOrder - 1);
      } else {
        parentElement.prepend(this.clone);
      }
      this.isVisible = false;
    } else if (!shouldPrioritise) {
      // Remove the clone and relpace the placeholder with the element
      this.clone.remove();
      this.isVisible = true;
      this.placeholder.replaceWith(this.element);

      // Run showIn and hideIn methods to determine visibility
      if (this.showIn.length > 0) this.showInMarket(market);
      if (this.hideIn.length > 0) this.hideInMarket(market);
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
