class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _prepareData(res) {
    return res.ok
      ? res.json()
      : Promise.reject({
          name: `Произошла ошибка на стороне сервера: ${res.status}, ${
            res.status === 404 ? `обратитесь в техническую поддержку нашего приложения` : `попробуйте позже`
          }.`,
          isServerError: true,
        });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    }).then(this._prepareData);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._prepareData);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._prepareData);
  }

  postCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._prepareData);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    }).then(this._prepareData);
  }

  setAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._prepareData);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      credentials: 'include',
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._prepareData);
  }

  getAllInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: '5c55e35b-36cb-4e1a-9a83-df32a17d9ee6',
    'Content-Type': 'application/json',
  },
});

// const api = new Api({
//   baseUrl: 'api.mesto.hannahstarling.nomoredomains.work',
// credentials: 'include',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

export default api;
