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
  };

  const closeModalByEsc = (evt) => {
    if (evt.key === 'Escape') {
      closeModalWindow(openedModalID)
    }
  };

  const closeModalByBackground = (evt) => {
    if (evt.target.classList.contains('modal__bg')) {
      closeModalWindow(openedModalID)
    }
  };

  const closeModalByButton = (evt) => closeModalWindow(evt.currentTarget.dataset.modalClose);

  const closeModalWindow = (modalID) => {
    const targetModal = document.getElementById(modalID);

    targetModal.classList.remove('visible');
    document.querySelector('body').classList.remove('fixed');

    window.removeEventListener('click', closeModalByBackground);
    window.removeEventListener('keydown', closeModalByEsc);
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



  let isDialogSupported = true;
    if (!window.HTMLDialogElement) {
    document.body.classList.add("no-dialog");
    isDialogSupported = false;
  }

  button.onclick = () => {
    if (isDialogSupported) {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }
    //   Focus first input when dialog opens
    modal.querySelector("input").focus();
  };

  modal.addEventListener("transitionend", e => {
    modal.querySelector("input").focus();
  });

})();
