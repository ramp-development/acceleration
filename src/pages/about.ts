export const about = () => {
  console.log('about');

  // shift the page when a select is changed
  const selects = document.querySelectorAll<HTMLSelectElement>('select');
  selects.forEach((select) => {
    const { mirrorValue } = select.dataset;
    let mirrorTarget: HTMLHeadElement | null = null;
    if (mirrorValue) {
      mirrorTarget = document.querySelector<HTMLHeadElement>(
        `[data-mirror-target="${mirrorValue}"]`
      );
    }

    select.addEventListener('change', (event) => {
      if (mirrorTarget) {
        let { value } = event.target as HTMLSelectElement;
        if (value === '') value = event.target.dataset.mirrorDefault ?? '';
        mirrorTarget.textContent = value;
      }
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
};
