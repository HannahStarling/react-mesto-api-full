class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  request = ({ url, method = 'GET', body }) => {
    const config = {
      credentials: 'include',
      method,
      headers: this._headers,
      ...(!!body && { body: JSON.stringify(body) }),
    };
    return fetch(`${this._baseUrl}${url}`, config).then(this._prepareData);
  };

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

  getUserInfo = () => this.request({ url: '/users/me' });

  setUserInfo = ({ name, about }) => this.request({ url: '/users/me', method: 'PATCH', body: { name, about } });

  getInitialCards = () => this.request({ url: '/cards' });

  postCard = ({ name, link }) => this.request({ url: '/cards', method: 'POST', body: { name, link } });

  deleteCard = (id) => this.request({ url: `/cards/${id}`, method: 'DELETE' });

  setAvatar = ({ avatar }) => this.request({ url: '/users/me/avatar', method: 'PATCH', body: { avatar } });

  changeLikeCardStatus = (id, isLiked) =>
    this.request({ url: `/cards/${id}/likes`, method: isLiked ? 'PUT' : 'DELETE' });

  getAllInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.hannahstarling.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
