const API_URL = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';

class Api {
  setToken(token) {
    this.token = token;
  }

  _request(path, data, isAuth, method) {
    const headers = {
      'Content-Type': 'application/json'
    };
    if(isAuth) headers['Authorization'] = `Bearer ${this.token}`;
    const options = {
      method,
      headers
    };
    if(method == 'POST') options['body'] = JSON.stringify(data);
    console.log(options);
    return fetch(`${API_URL}${path}`, options);
  }

  _post(path, data, isAuth) {
    return this._request(path, data, isAuth, 'POST');
  }

  _get(path, isAuth) {
    return this._request(path, undefined, isAuth, 'GET');
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

  getIdeas() {
    return this._get('/ideas', true);
  }
}

export default Api;



