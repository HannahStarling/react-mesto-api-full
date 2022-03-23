export const BASE_URL = 'api.mesto.hannahstarling.nomoredomains.work';

const prepareData = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject({
        name: `Произошла ошибка: ${
          res.status === 404
            ? `обратитесь в техническую поддержку нашего приложения`
            : res.status === 401
            ? `неверно введён пароль, попробуйте снова`
            : `сервер не отвечает на запросы, попробуйте позднее. Код ошибки: ${res.status}`
        }.`,
        isServerError: true,
      });
};

const request = ({ url, method = 'POST', body }) => {
  const config = {
    credentials: 'include',
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...(!!body && { body: JSON.stringify(body) }),
  };
  return fetch(`${BASE_URL}${url}`, config).then(prepareData);
};

export const register = (password, email) => request({ url: '/signup', body: { password, email } });

export const authorize = (password, email) => request({ url: '/signin', body: { password, email } });

export const getContent = () => request({ url: '/users/me', method: 'GET' });

export const signOut = () => request({ url: '/signout', method: 'DELETE' });
