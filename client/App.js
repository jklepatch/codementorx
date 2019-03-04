import React, { Component } from 'react';
import Signup from './Signup';
import Sidebar from './Sidebar';
import { AuthProvider } from './AuthContext';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    fontFamily: "'Roboto', sans-serif",
    display: 'flex',
    minHeight: '100vh'
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }
  render() {
    const children = typeof this.state.user === 'undefined' ? <Signup /> : null;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <AuthProvider>
          <Sidebar user={{name: 'Jose'}} />
          {children}
        </AuthProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
