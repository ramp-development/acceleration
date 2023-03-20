export const services = () => {
  const sticky = document.querySelector('[data-sticky="vertical-center"]');
  sticky.style.top = `${(window.innerHeight - sticky.offsetHeight) / 2}px`;
};
