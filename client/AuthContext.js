import React, { Component } from 'react';
import Api from './api';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = { user: undefined }
  api = new Api()

  login = (user) => {
    this.setState({user});
  }

  logout = () => {
    this.api.logout(this.state.user);
    this.api.setToken(undefined);
    this.setState({user: undefined});
  }

  render() {
    return (
      <AuthContext.Provider value={{ 
        user: this.state.user, 
        login: this.login,
        logout: this.logout,
        api: this.api
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };

