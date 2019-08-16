(() => {
  const modalTriggers = document.querySelectorAll('*[data-modal-target]');
  const closeModalButtons = document.querySelectorAll('*[data-modal-close]');
  let openedModalID;

  const openModalWindow = (evt) => {
    const target = evt.currentTarget;
    const modalID = target.dataset.modalTarget;
    const targetModal = document.getElementById(modalID);

    (openedModalID !== undefined) ? closeModalWindow(openedModalID) : null;

    (modalID === 'service-example') ? createServiceExampleModal(target, targetModal) : null;

    openedModalID = modalID;

    targetModal.classList.add('visible');
    document.querySelector('body').classList.add('fixed');

    window.addEventListener('click', closeModalByBackground);
    window.addEventListener('keydown', closeModalByEsc);

    const
      focusableElements = targetModal.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'),
      firstFocusableElement = focusableElements[0],
      lastFocusableElement = focusableElements[focusableElements.length - 1];

    function lockFocusInModal(event) {
      if (event.key === 'Tab' || event.keyCode === 9) {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();  
            firstFocusableElement.focus();
          }
        }
      }
    }

    targetModal.addEventListener('keydown', lockFocusInModal);

  };

  const closeModalByEsc = (evt) => {
    if (evt.key === 'Escape') {
      closeModalWindow(openedModalID);
    }
  };

  const closeModalByBackground = (evt) => {
    if (evt.target.classList.contains('modal__bg')) {
      closeModalWindow(openedModalID);
    }
  };

  const closeModalByButton = (evt) => closeModalWindow(evt.currentTarget.dataset.modalClose);

  const closeModalWindow = (modalID) => {
    const targetModal = document.getElementById(modalID);

    targetModal.classList.remove('visible');
    document.querySelector('body').classList.remove('fixed');

    window.removeEventListener('click', closeModalByBackground);
    window.removeEventListener('keydown', closeModalByEsc);
    // targetModal.removeEventListener('keydown', lockFocusInModal);
  };

  const initializeModalTriggers = () => {
    for (const button of modalTriggers) {
      button.addEventListener('click', openModalWindow);
    }
  };

  closeModalButtons.forEach(button => button.addEventListener('click', closeModalByButton));

  window.modals = {
    openModalWindow: openModalWindow,
    closeModalWindow: closeModalWindow,
  };

  function createServiceExampleModal(target, targetModal) {
    const
      serviceTitle = target.parentElement.querySelector('.what-you-get__item-title').textContent.replace(/\s+/g,' ').trim(),
      modalTitle = targetModal.querySelector('.modal__title'),
      pathToImage = target.dataset.modalServiceExampleImage,
      modalImage = targetModal.querySelector('.modal__image');
    
    modalTitle.textContent = serviceTitle;
    modalImage.src = pathToImage;
  }

  initializeModalTriggers();

})();
