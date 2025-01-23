class Api {
  constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl;
      this.headers = headers;
  }

  _makeRequest(endpoint, method = 'GET', body = null) {
        const token = localStorage.getItem('token');
        const options = {
            method,
            headers: {
                ...this.headers,
                ...(token && { authorization: `Bearer ${token}` })
            }
        };

        if (body) {
            options.headers['Content-Type'] = 'application/json'; 
            options.body = JSON.stringify(body);
        }

        return fetch(`${this.baseUrl}${endpoint}`, options)
            .then((res) => {
                if (!res.ok) throw new Error(`Server ERROR: ${res.status}`);
                return res.json();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
  }

  getInitialCards() {
      return this._makeRequest('/cards');
  }

  getUserInfo() {
      return this._makeRequest('/users/me');
  }

  editProfile({name, about}) {
      return this._makeRequest('/users/me', 'PATCH', { name, about });
  }

  editProfilePicture({avatar}) {
      return this._makeRequest('/users/me/avatar', 'PATCH', { avatar });
  }

  addCard({name, link}) {
      return this._makeRequest('/cards', 'POST', { name, link });
  }

  deleteCard(cardId) {
      return this._makeRequest(`/cards/${cardId}`, 'DELETE');
  }

  changeLikeCardStatus(cardId, isLiked) {
    // isLiked ? this.addLike(cardId) : this.removeLike(cardId);
    return isLiked ? this._makeRequest(`/cards/likes/${cardId}`, 'PUT') : this._makeRequest(`/cards/likes/${cardId}`, 'DELETE');;
  }

  addLike(cardId) {
      return this._makeRequest(`/cards/likes/${cardId}`, 'PUT');
  }

  removeLike(cardId) {
      return this._makeRequest(`/cards/likes/${cardId}`, 'DELETE');
  }
}

const api = new Api({
//   baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-13",
//   baseUrl: "http://localhost:3000",
  baseUrl: "http://api.bmsproject.mooo.com",
  headers: {
    //   authorization: "4fe5fb1a-9a42-4631-9f7e-39eb49951a0f",
      "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "https://around.nomoreparties.co/v1/web-ptbr-cohort-13"

  }
});

export default api;
