export const handleMarketParameter = (value: string): void => {
  // Create a URL object
  const urlObject = new URL(window.location.href);

  // Set the new value for the market parameter
  urlObject.searchParams.set('market', value);

  // Use history.pushState to change the URL in the address bar without reloading
  history.pushState({}, '', urlObject.toString());

  // Save the new value in the local storage
  sessionStorage.setItem('market', value);
};
