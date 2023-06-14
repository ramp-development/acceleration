// Store removed elements in a map
export const removedElementsMap: Record<
  string,
  { placeholder: Comment; element: HTMLElement; originalIndex: number }[]
> = {};
