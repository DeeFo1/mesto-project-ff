import './pages/index.css'
import { initialCards } from './components/cards.js'
import { createCard, deleteCard, like } from './components/card.js';
import { openModal, closeModal, closePopupWithButton, closePopupOnEscape } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, updateUserData, updateUserAvatar, getUserData, getNewCard, deleteNewCard } from './components/api.js';


const cardPlace = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupTypeImageCaption = document.querySelector('.popup__caption');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeEdit = document.querySelector('.popup_type_edit');
let personalId = '';

function buttonLoading (button, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

//MODAL

const editProfileButton = document.querySelector('.profile__edit-button');

const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup_type_new-card');

const closePopupButtonList = document.querySelectorAll('.popup__close');
const popupOverlayList = document.querySelectorAll('.popup');

popupTypeEdit.classList.add('popup_is-animated');
addPlacePopup.classList.add('popup_is-animated');
popupTypeImage.classList.add('popup_is-animated');

editProfileButton.addEventListener('click', function() {
  clearValidation(formEditProfile, validationConfig);
  openPopupProfile();
});

addPlaceButton.addEventListener('click', function() {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openModal(addPlacePopup);
});

closePopupButtonList.forEach(function(btn) {
  btn.addEventListener('click', closePopupWithButton);
});

popupOverlayList.forEach(function(overlay) {
  overlay.addEventListener('click', function(event) {
      if (event.target === overlay) {
        closeModal(overlay);
      };
  });
});

// Image popup

function imagePopup (card) {
  openModal(popupTypeImage);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupTypeImageCaption.textContent = card.name;
}

// @todo: Вывести карточки на страницу и получить данные пользователя
Promise.all([getUserData(), getInitialCards()])
  .then(([data, cards]) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    personalId = data._id;
    cards.forEach(function(card) {
    const readyElement = createCard(card, personalId, deleteCard, like, imagePopup);
    cardPlace.append(readyElement);
    });
  })
  .catch((err) => {
    console.log(err); 
  }); 

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.name;
const descriptionInput = formEditProfile.description;
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const avatarEdit = document.querySelector('.popup_avatar_edit')
const avatarForm = document.forms['edit-avatar'];
const avatarFormInput = avatarForm.avatar;
const avatarEditButton = document.querySelector('.profile__image-button');

avatarEditButton.addEventListener('click', function() {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarEdit);
})

function openPopupProfile(){
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
} 

function handleProfileSubmit(evt) {
  evt.preventDefault();
  
  const profileButton = popupTypeEdit.querySelector('.popup__button')
  buttonLoading (profileButton, true)

  updateUserData(nameInput.value, descriptionInput.value)
    .then(userData => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
    console.log(err); 
    })
    .finally(() => {
      buttonLoading (profileButton, false)
    }) 
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const avatarButton = avatarEdit.querySelector('.popup__button')
  buttonLoading (avatarButton, true)
  
  updateUserAvatar(avatarFormInput.value)
    .then(userData => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarEdit);
    })
    .catch((err) => {
    console.log(err); 
    })
    .finally(() => {
      buttonLoading (avatarButton, false)
    })    
}

formEditProfile.addEventListener('submit', handleProfileSubmit); 
avatarForm.addEventListener('submit', handleAvatarSubmit);

// ФОРМА ДОБАВЛЕНИЯ КАРТОЧЕК

const formNewPlace = document.forms['new-place'];
const placeName = formNewPlace['place-name'];
const placeUrl = formNewPlace.link;

function handlePlaceSubmit(evt) {
  evt.preventDefault();

  const placeButton = formNewPlace.querySelector('.popup__button')
  buttonLoading (placeButton, true)

  getNewCard(placeName.value, placeUrl.value)
    .then(cardData => {
      const newCardElement = createCard(cardData, personalId, deleteCard, like, imagePopup);
      cardPlace.prepend(newCardElement);
      formNewPlace.reset();
      closeModal(popupTypeNewCard);
    })
    .catch((err) => {
    console.log(err); 
    })
    .finally(() => {
      buttonLoading (placeButton, false)
    }) 
};

formNewPlace.addEventListener('submit', handlePlaceSubmit);

// VALIDATION
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

enableValidation(validationConfig);

