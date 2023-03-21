export const initCopyURL = () => {
  const URL = window.location.href;
  const copyURLs = [...document.querySelectorAll('[data-copy-url]')];
  copyURLs.forEach((copyURL) => {
    copyURL.addEventListener('click', () => {
      navigator.clipboard.writeText(URL);
    });
  });
};
