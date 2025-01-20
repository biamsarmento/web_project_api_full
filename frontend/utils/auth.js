export const BASE_URL = "https://register.nomoreparties.co";

// A função register aceita os dados necessários como argumentos
// e envia uma solicitação POST ao endpoint especificado.
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      // authorization: "4fe5fb1a-9a42-4631-9f7e-39eb49951a0f",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
};

// A função authorize aceita os dados necessários como parâmetros.
export const authorize = (password, email) => {
    // Uma solicitação POST é enviada para /auth/local.
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Os parâmetros são envolvidos em um objeto, convertidos em uma string
      // JSON e enviados no body da solicitação.
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  };

export const retrieveEmail = (token) => {
    // Uma solicitação POST é enviada para /auth/local.
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      // Os parâmetros são envolvidos em um objeto, convertidos em uma string
      // JSON e enviados no body da solicitação.
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  };