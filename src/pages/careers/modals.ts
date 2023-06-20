import { simulateEvent } from '@finsweet/ts-utils';

export const modals = () => {
  let modalButtons = [...document.querySelectorAll('[data-modal-button]')];
  const modalTriggers = [...document.querySelectorAll('[data-modal-trigger]')];

  const arrowButtons = [...document.querySelectorAll('.splide__arrows')];
  arrowButtons.forEach((button) => {
    button.addEventListener('click', () => {
      modalButtons = [...document.querySelectorAll('[data-modal-button]')];
      updateEventListeners();
    });
  });

  const updateEventListeners = () => {
    modalButtons.forEach((button) => {
      button.removeEventListener('click', openModal);
      button.addEventListener('click', openModal);
    });
  };

  const openModal = (event) => {
    const button = event.currentTarget;
    const modalSlug = button.dataset.modalButton;
    const modalTrigger = modalTriggers.find(
      (trigger) => trigger.dataset.modalTrigger === modalSlug
    );
    simulateEvent(modalTrigger, 'click');
  };

  updateEventListeners();
};
