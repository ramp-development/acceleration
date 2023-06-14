import { createElement } from '$utils/createElement';

export const about = () => {
  console.log('about');

  // shift the page when a select is changed
  const selects = document.querySelectorAll<HTMLSelectElement>('select');
  selects.forEach((select) => {
    const { mirrorValue } = select.dataset;
    if (!mirrorValue) return;
    const mirrorTarget = document.querySelector<HTMLHeadingElement>(
      `[data-mirror-target="${mirrorValue}"]`
    );

    select.addEventListener('change', (event) => {
      let { value } = event.target as HTMLSelectElement;
      if (value === '') value = event.target.dataset.mirrorDefault ?? '';
      mirrorTarget.textContent = value;
      setTimeout(() => {
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
      }, 200);
    });
  });

  // add options to the leadership select
  const select = document.querySelector<HTMLSelectElement>('select[name="Leadership"]');
  const markets = document.querySelectorAll<HTMLDivElement>(
    '.w-dyn-item [fs-cmsfilter-field="market"]'
  );

  const marketsArray: string[] = [];
  markets.forEach((market) => {
    if (market.textContent) marketsArray.push(market.textContent);
  });
  const marketsSet = new Set(marketsArray.sort());

  marketsSet.forEach((market) => {
    const option = new Option(market, market);
    if (select) select.add(option);
  });

  createElement('script', document.head, {
    src: 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js',
    async: true,
  });
};
