import './pages/index.css'
import { initialCards } from './components/cards.js'
import { createCard, deleteCard, like, popupTypeImage } from './components/card.js';
import { modalPopups } from './components/modal.js';

const cardPlace = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');



function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEscape);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEscape);
}

function closePopupOnEscape(event) {
  if (event.key === 'Escape') { 
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      openPopup.classList.remove('popup_is-opened'); 
    } 
  }
}

// Image popup

function imagePopup (card) {
  openModal(popupTypeImage);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(card) {
  const readyElement = createCard(card, deleteCard, like, imagePopup);
  cardPlace.append(readyElement);
});

// МОДАЛЬНЫЕ ОКНА

modalPopups();

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.name;
const descriptionInput = formEditProfile.description;
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description');

nameInput.value = profileTitle.textContent;
descriptionInput.value = profileDescription.textContent;

function handleProfileSubmit(evt) {
  evt.preventDefault();
 
  const name = nameInput.value;
  const description = descriptionInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;

  const popupTypeEdit = document.querySelector('.popup_type_edit');
  closeModal(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleProfileSubmit); 

// ФОРМА ДОБАВЛЕНИЯ КАРТОЧЕК

const formNewPlace = document.forms['new-place'];
const placeName = formNewPlace['place-name'];
const placeUrl = formNewPlace.link;

function handlePlaceSubmit(evt) {
  evt.preventDefault();
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  //const cardPlace = document.querySelector('.places__list');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', like); 
  cardImage.src = placeUrl.value;
  cardTitle.textContent = placeName.value;
  cardImage.alt = placeName.value;

  popupTypeImage.classList.add('popup_is-animated');
  cardElement.querySelector('.card__image').addEventListener('click', function() {
    popupImage.src = cardImage.src; 
    popupImage.alt = cardTitle.textContent;  
    popupCaption.textContent = cardTitle.textContent; 
    popupTypeImage.classList.add('popup_is-opened');
  });

  cardPlace.prepend(cardElement);
  formNewPlace.reset();
  const popupTypeNewCard = document.querySelector('.popup_type_new-card');
  closeModal(popupTypeNewCard);

};

formNewPlace.addEventListener('submit', handlePlaceSubmit);