import { deleteNewCard, likeCard } from "./api";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы


// @todo: Функция создания карточки

function createCard(card, personalId, callBackDeleteCard, likeCallback, imageCallback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const likesCount = cardElement.querySelector('.card__likes-count')
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').alt = card.name;
  likesCount.textContent = card.likes.length;
  const deleteButton = cardElement.querySelector('.card__delete-button');

  const isCardLiked = card.likes.find(card => card._id.includes(personalId));

  if (personalId !== card.owner._id) {
    deleteButton.style.display = 'none';
  }

  deleteButton.addEventListener('click', function() {
    callBackDeleteCard(cardElement, card._id)
  });
  const likeButton = cardElement.querySelector('.card__like-button');
  if(isCardLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', function() {
    likeCallback(likeButton, card._id, likesCount)
  });
  document.querySelector('.popup_type_image').classList.add('popup_is-animated');
  cardElement.querySelector('.card__image').addEventListener('click', function() {
    imageCallback(card);
  });
  
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(cardElement, id) {
  deleteNewCard(id)
    .then(data => {
      cardElement.remove();
    })
    .catch((err) => {
    console.log(err); 
    }); 
};

// Like
function like (button, id, likeCounter) {

  const isLiked = button.classList.contains('card__like-button_is-active');

  likeCard(id, isLiked)
    .then(data => {
        if (button.classList.contains('card__like-button')) {
        button.classList.toggle('card__like-button_is-active');
        likeCounter.textContent = data.likes.length;
    }
    })
    .catch((err) => {
    console.log(err); 
  }); 
}



export { createCard, deleteCard, like };