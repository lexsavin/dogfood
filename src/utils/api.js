const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProductList() {
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers,
    }).then(onResponce);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(onResponce);
  }

  getProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, {
      headers: this._headers,
    }).then(onResponce);
  }

  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(dataUser),
    }).then(onResponce);
  }

  search(searchQuery) {
    return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
      headers: this._headers,
    }).then(onResponce);
  }

  changeLikeProduct(productId, isLike) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(onResponce);
  }
}

const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "content-type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UxMjdlNjU5Yjk4YjAzOGY3N2IyMTciLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzU3ODg4LCJleHAiOjE3MDcyOTM4ODh9.mVPNRrlZCjGIngnf2Mi89XsQ6nODRra4y75AcjD3MSk",
  },
};

const api = new Api(config);

export default api;
