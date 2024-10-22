// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы


// @todo: Функция создания карточки

function createCard(card, callBackDeleteCard, likeCallback, imageCallback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').alt = card.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', callBackDeleteCard);
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCallback);
  document.querySelector('.popup_type_image').classList.add('popup_is-animated');
  cardElement.querySelector('.card__image').addEventListener('click', function() {
    imageCallback(card);
  });
  
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

// Like
function like (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}



export { createCard, deleteCard, like };