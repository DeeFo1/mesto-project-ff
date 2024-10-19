function modalPopups() {
const editProfileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');

const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup_type_new-card');

const closePopupButton = document.querySelectorAll('.popup__close');
const popupOverlay = document.querySelectorAll('.popup');

profilePopup.classList.add('popup_is-animated');
addPlacePopup.classList.add('popup_is-animated');

editProfileButton.addEventListener('click', function() {
  profilePopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEscape);
});

addPlaceButton.addEventListener('click', function() {
  addPlacePopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEscape);
});

function closePopupWithButton(evt) {
    const popup = evt.target.closest('.popup');
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupOnEscape);
};

closePopupButton.forEach(function(btn) {
  btn.addEventListener('click', closePopupWithButton);
});

popupOverlay.forEach(function(overlay) {
  overlay.addEventListener('click', function(event) {
      if (event.target === overlay) {
        overlay.classList.remove('popup_is-opened');
        document.addEventListener('keydown', closePopupOnEscape);
      };
  });
});

function closePopupOnEscape(event) {
  if (event.key === 'Escape') { 
    const openPopup = document.querySelector('.popup_is-opened');
    //if (openPopup) {
      openPopup.classList.remove('popup_is-opened'); 
    //} 
  }
}
};

export { modalPopups };