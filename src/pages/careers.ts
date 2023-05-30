import { simulateEvent } from '@finsweet/ts-utils';

export const careers = () => {
  console.log('careers');
  const modalButtons = [...document.querySelectorAll('[data-modal-button]')];
  const modalTriggers = [...document.querySelectorAll('[data-modal-trigger]')];

  modalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modalSlug = button.dataset.modalButton;
      const modalTrigger = modalTriggers.find(
        (trigger) => trigger.dataset.modalTrigger === modalSlug
      );
      simulateEvent(modalTrigger, 'click');
    });
  });
};
