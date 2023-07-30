class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }).then(this._checkResponse);
  }

  changeUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link }),
    }).then(this._checkResponse);
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // like/dislike
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

//----------Подключить API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "75002ca2-dbbe-408c-9329-d30070b2e425",
    "Content-Type": "application/json",
  },
});

export default api;
