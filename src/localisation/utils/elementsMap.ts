// Store elements in a map
export type ElementMap = Record<string, { placeholder: Comment; element: HTMLElement }[]>;
export const elementsMap = {
  showElementsMap: {} as Record<string, { placeholder: Comment; element: HTMLElement }[]>,
  hideElementsMap: {} as Record<string, { placeholder: Comment; element: HTMLElement }[]>,
  priorityElementsMap: {} as Record<
    string,
    { placeholder: Comment; element: HTMLElement; clone: HTMLElement }[]
  >,
};
