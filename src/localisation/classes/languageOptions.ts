import type { Market } from '../type';
import { createElementPlaceholder } from '../utils/createElementPlaceholder';

export class LanguageOption {
  public code: string;
  public name: string;
  public option: HTMLOptionElement;
  private isVisible: boolean;
  private placeholder: Comment;

  constructor(code: string, name: string) {
    this.code = code;
    this.name = name;

    this.option = document.createElement('option');
    this.option.value = code;
    this.option.text = name;

    this.isVisible = true;

    this.placeholder = createElementPlaceholder();
  }

  // Add the option to the select
  public appendTo(select: HTMLSelectElement) {
    select.add(this.option);
  }

  // Disable the option
  private disable() {
    if (!this.isVisible) return;
    this.option.replaceWith(this.placeholder);
    this.isVisible = false;

    // If the option is selected, select the first option
    if (!this.option.selected) return;
    const select = this.placeholder.parentElement as HTMLSelectElement;
    const firstOption = select.querySelector('option') as HTMLOptionElement;
    select.value = firstOption.value;
    select.dispatchEvent(new Event('change'));
    this.option.selected = false;
  }

  // Enable the option
  private enable() {
    if (this.isVisible) return;
    this.placeholder.replaceWith(this.option);
    this.isVisible = true;
  }

  // Global method to update the option based on the market
  updateVisibilityForMarket(market: Market) {
    if (market.langCodes?.includes(this.code)) {
      this.enable();
    } else {
      this.disable();
    }
  }
}
