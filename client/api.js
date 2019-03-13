//const API_URL = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';
console.log('API_URL');
console.log(process.env.API_URL);

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
    if(['POST', 'PUT', 'DELETE'].indexOf(method) > -1) options['body'] = JSON.stringify(data);
    return fetch(`${API_URL || 'http://localhost:3000'}${path}`, options);
  }

  _post(path, data, isAuth) {
    return this._request(path, data, isAuth, 'POST');
  }

  _get(path, isAuth) {
    return this._request(path, undefined, isAuth, 'GET');
  }

  _delete(path, data, isAuth) {
    return this._request(path, data, isAuth, 'DELETE');
  }

  _put(path, data, isAuth) {
    return this._request(path, data, isAuth, 'PUT');
  }

  signup(user) {
    return this._post('/users', user);
  }

  login(user) {
    return this._post('/access-tokens', user);
  }

  logout(user) {
    return this._delete('/access-tokens', {refresh_token: user.refresh_token}, true);
  }

  getMe() {
    return this._get('/me', true);
  }

  createIdea(idea) {
    return this._post('/ideas', idea, true);
  }

  getIdeas() {
    return this._get('/ideas', true);
  }

  deleteIdea(id) {
    return this._delete(`/ideas/${id}`, undefined, true);
  }

  updateIdea(id, update) {
    return this._put(`/ideas/${id}`, update, true);
  }
}

export default Api;



