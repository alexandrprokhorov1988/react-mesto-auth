class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'authorization': `Bearer ${token}`,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  setUserInfo({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setNewCard({ name, link }, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return (`Карточка с id: ${cardId} удалена`);
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  likeCard(cardId, isLiked, token) {
    let method = '';
    if (!isLiked) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: cardId
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  setUserAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}

const api = new Api({
  baseUrl: 'https://api.apro.students.nomoreparties.xyz',
});

export default api;
