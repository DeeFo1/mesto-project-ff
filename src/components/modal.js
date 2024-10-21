function modalPopups() {
const editProfileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');

const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup_type_new-card');

const closePopupButtonList = document.querySelectorAll('.popup__close');
const popupOverlayList = document.querySelectorAll('.popup');

profilePopup.classList.add('popup_is-animated');
addPlacePopup.classList.add('popup_is-animated');

function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEscape);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEscape);
}

editProfileButton.addEventListener('click', function() {
  openModal(profilePopup)

});

addPlaceButton.addEventListener('click', function() {
  openModal(addPlacePopup);
});

function closePopupWithButton(evt) {
    const popup = evt.target.closest('.popup');
    closeModal(popup);
};

closePopupButtonList.forEach(function(btn) {
  btn.addEventListener('click', closePopupWithButton);
});

popupOverlayList.forEach(function(overlay) {
  overlay.addEventListener('click', function(event) {
      if (event.target === overlay) {
        overlay.classList.remove('popup_is-opened');
        //document.addEventListener('keydown', closePopupOnEscape);
      };
  });
});

function closePopupOnEscape(event) {
  if (event.key === 'Escape') { 
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      openPopup.classList.remove('popup_is-opened'); 
    } 
  }
}   
};

export { modalPopups };
