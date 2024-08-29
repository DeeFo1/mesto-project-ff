
// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

const cardPlace = document.querySelector('.places__list');
// @todo: Функция создания карточки

function createCard(card, callBackDeleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', callBackDeleteCard);
  return cardElement;
}
// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};
// @todo: Вывести карточки на страницу

initialCards.forEach(function(card) {
let readyElement = createCard(card, deleteCard);
cardPlace.append(readyElement);
});
