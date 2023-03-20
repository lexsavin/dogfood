import { BASE_URL } from "./constants";

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  signUp(authorizationData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(authorizationData),
    }).then(onResponce);
  }

  signIn(authorizationData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(authorizationData),
    }).then(onResponce);
  }

  getProductList(token) {
    return fetch(`${this._baseUrl}/products`, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then(onResponce);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then(onResponce);
  }

  getProductById(idProduct, token) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then(onResponce);
  }

  setUserInfo(dataUser, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataUser),
    }).then(onResponce);
  }

  createReviewProduct(productId, reviewData, token) {
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(reviewData),
    }).then(onResponce);
  }

  search(searchQuery, token) {
    return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then(onResponce);
  }

  changeLikeProduct(productId, isLike, token) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }).then(onResponce);
  }
}

const api = new Api(BASE_URL);

export default api;
