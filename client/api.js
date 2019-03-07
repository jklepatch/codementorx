const API_URL = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';

class Api {
  setToken(token) {
    this.token = token;
  }

  _post(path, data, isAuth) {
    const headers = {
      'Content-Type': 'application/json'
    };
    if(isAuth) headers['Authorization'] = `Bearer ${this.token}`;
    return fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
  }

  signup(user) {
    return this._post('/users', user);
  }

  login(user) {
    return this._post('/access-tokens', user);
  }

  createIdea(idea) {
    return this._post('/ideas', idea, true);
  }
}

export default Api;



