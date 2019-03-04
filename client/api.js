const API_URL = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';

class Api {
  setToken(token) {
    this.token = token;
  }

  _post(path, data) {
    return fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  signup(user) {
    return this._post('/users', user);
  }
}

export default Api;



