class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 400) {
          return Promise.reject('Введенные данные некорректны');
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 400) {
          return Promise.reject('Введенные данные некорректны');
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return (`Карточка с id: ${cardId} удалена`);
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  likeCard(cardId, isLiked) {
    let method = '';
    if (!isLiked) {
      method = 'DELETE';
    } else {
      method = 'PUT';
    }
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
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

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 400) {
          return Promise.reject('Введенные данные некорректны');
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}

const api = new Api({
  baseUrl: 'https://api.apro.students.nomoreparties.xyz',
});

export default api;
