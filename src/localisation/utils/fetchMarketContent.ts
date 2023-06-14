/**
 * Fetches the market data from the given link and returns a parsed HTML document
 */
export const fetchMarketContent = (link: string): Promise<Document> => {
  return fetch(link)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      return parser.parseFromString(html, 'text/html');
    });
};
