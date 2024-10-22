import './pages/index.css'
import { initialCards } from './components/cards.js'
import { createCard, deleteCard, like } from './components/card.js';
import { openModal, closeModal, closePopupWithButton, closePopupOnEscape } from './components/modal.js';

const cardPlace = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupTypeImageCaption = document.querySelector('.popup__caption');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeEdit = document.querySelector('.popup_type_edit');
//MODAL
const editProfileButton = document.querySelector('.profile__edit-button');

const addPlaceButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup_type_new-card');

const closePopupButtonList = document.querySelectorAll('.popup__close');
const popupOverlayList = document.querySelectorAll('.popup');

popupTypeEdit.classList.add('popup_is-animated');
addPlacePopup.classList.add('popup_is-animated');

editProfileButton.addEventListener('click', function() {
  openPopupProfile();
});

addPlaceButton.addEventListener('click', function() {
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

// @todo: Вывести карточки на страницу

initialCards.forEach(function(card) {
  const readyElement = createCard(card, deleteCard, like, imagePopup);
  cardPlace.append(readyElement);
});

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.name;
const descriptionInput = formEditProfile.description;
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description');

function openPopupProfile(){
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
} 

function handleProfileSubmit(evt) {
  evt.preventDefault();
  
  const name = nameInput.value;
  const description = descriptionInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;

  
  closeModal(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleProfileSubmit); 

// ФОРМА ДОБАВЛЕНИЯ КАРТОЧЕК

const formNewPlace = document.forms['new-place'];
const placeName = formNewPlace['place-name'];
const placeUrl = formNewPlace.link;

function handlePlaceSubmit(evt) {
  evt.preventDefault();
  const newCard = {
      name: placeName.value,
      link: placeUrl.value,
    };
  const newCardElement = createCard(newCard, deleteCard, like, imagePopup);
  cardPlace.prepend(newCardElement);
  formNewPlace.reset();
  closeModal(popupTypeNewCard);
};

formNewPlace.addEventListener('submit', handlePlaceSubmit);