import React, { Component } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Signup from './components/Signup';
import Login from './components/Login';
import Ideas from './components/ideas/Ideas';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './AuthContext';
import { PrivateRoute, PublicRoute } from './Routes';

const styles = theme => ({
  container: {
    fontFamily: "'Roboto', sans-serif",
    display: 'flex',
    minHeight: '100vh'
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <AuthProvider>
          <Sidebar />
          <Router>
            <Switch>>
              {/*<PublicRoute path='/' component={Ideas} />*/}
              <PublicRoute path='/' component={Signup} exact />
              <PublicRoute path='/login' component={Login} />
              <PrivateRoute path='/ideas' component={Ideas} />}
            </Switch>
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
