export interface LocalisedElements {
  targetElements: HTMLDivElement[];
  showInElements: HTMLDivElement[];
  hideInElements: HTMLDivElement[];
  priorityInElements: HTMLDivElement[];
  linkedSelects: HTMLSelectElement[];
}

export interface Market {
  id: string;
  link: string;
  icon: HTMLImageElement;
}

export interface Language {
  code: string;
  name: string;
}
