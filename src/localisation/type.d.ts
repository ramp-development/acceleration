export interface LocalisedElements {
  targetElements: HTMLDivElement[];
  showInElements: HTMLDivElement[];
  hideInElements: HTMLDivElement[];
  priorityInElements: HTMLDivElement[];
  linkedSelects: HTMLSelectElement[];
  mirrorElements: HTMLDivElement[];
}

export interface Market {
  id: string;
  link: string;
  langCodes: string[];
  icon: HTMLImageElement;
}

export interface Language {
  code: string;
  name: string;
}

export type Type = 'showIn' | 'hideIn' | 'priorityIn';
