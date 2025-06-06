const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',  
  headers: {
    authorization: 'ed835aa4-48cd-4cf0-867a-ed445c46755a',
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
  if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(getResponseData)
} 

export const updateUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(getResponseData)
} 

export const updateUserAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(getResponseData)
} 

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(getResponseData)
} 

export const getNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(getResponseData)
} 

export const deleteNewCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(getResponseData)
} 

export const likeCard = (id, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers,
  })
  .then(getResponseData)
} 