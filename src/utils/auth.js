export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.status !== 400) {
        return res.json();
      }
      throw new Error('Некорректно заполнено одно из полей');
    })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      if (res.status === 400) {
        throw new Error('Не передано одно из полей');
      }
      if (res.status === 401) {
        throw new Error('Пользователь с email не найден');
      }
      throw new Error(`Ошибка авторизации: ${res.status}`); //todo 500
    })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      if (res.status === 400) {
        throw new Error('Токен не передан или передан не в том формате');
      }
      if (res.status === 401) {
        throw new Error('Переданный токен некорректен');
      }
      throw new Error(`Ошибка токена: ${res.status}`); //todo 500
    })
};
