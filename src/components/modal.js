function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEscape);
};

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEscape);
};

function closePopupWithButton(evt) {
    const popup = evt.target.closest('.popup');
    closeModal(popup);
};

function closePopupOnEscape(event) {
  if (event.key === 'Escape') { 
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closeModal(openPopup);
    } 
  }
};   


export { openModal, closeModal, closePopupWithButton, closePopupOnEscape };
