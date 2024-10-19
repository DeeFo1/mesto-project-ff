import './pages/index.css'
import { initialCards } from './components/cards.js'
import { createCard, deleteCard, like, imagePopup, cardPlace } from './components/card.js';
import { modalPopups } from './components/modal.js';


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

  document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
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
  const cardPlace = document.querySelector('.places__list');
  cardElement.querySelector('.card__image').src = placeUrl.value;
  cardElement.querySelector('.card__title').textContent = placeName.value;
  cardElement.querySelector('.card__image').alt = placeName.value;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function(evt) {
    evt.target.closest('.card').remove();
  });
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
    }
  });
  document.querySelector('.popup_type_image').classList.add('popup_is-animated');
  cardElement.querySelector('.card__image').addEventListener('click', function() {
    document.querySelector('.popup__image').src = cardElement.querySelector('.card__image').src;
    document.querySelector('.popup__image').alt = cardElement.querySelector('.card__title').textContent;
    document.querySelector('.popup__caption').textContent = cardElement.querySelector('.card__title').textContent;
    document.querySelector('.popup_type_image').classList.add('popup_is-opened');
  });

  cardPlace.prepend(cardElement);
  formNewPlace.reset();
  document.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');
};

formNewPlace.addEventListener('submit', handlePlaceSubmit);