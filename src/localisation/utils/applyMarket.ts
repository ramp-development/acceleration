/**
 * Fetches the "market" query parameter from the current URL or session storage
 * and applies the value to the market select
 *
 * @param marketSelect - The market select element
 */
export const applyMarket = (marketSelect: HTMLSelectElement): void => {
  // Fetch the "market" query parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const marketParam = urlParams.get('market');
  const market = marketParam ? marketParam : sessionStorage.getItem('market');

  console.log(marketParam);
  console.log(sessionStorage.getItem('market'));
  console.log(market);
  if (!market) return;

  // Check if the market exists in the select options
  const optionExists = Array.from(marketSelect.options).some((option) => option.value === market);
  if (!optionExists) return;

  // Apply the value to the select if it exists
  marketSelect.value = market;

  // Emit the "change" event to trigger any attached event handlers
  marketSelect.dispatchEvent(new Event('change'));
};
