import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { AuthContext } from './AuthContext';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '50%'
  },
  h2: {
    textAlign: 'center'
  },
  textField: {
    marginBottom: '2em'
  },
  button: {
    borderRadius: '0',
    backgroundColor: '#00A843',
    color: 'white',
    marginTop: '1em',
    padding: '1em'
  }
});

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: undefined 
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { errors, ...rest } = this.state;
    const resp = await this.context.api.login(rest);
    const jsonResp = await resp.json();
    if(typeof jsonResp.errors !== 'undefined') {
      this.setState({errors: jsonResp.errors });
      return; 
    }
    this.context.login({...rest, ...jsonResp});
  }

  handleChangeEmail(email) {
    this.setState({email});
  }

  handleChangePassword(password) {
    this.setState({password});
  }

  render() {
    const { classes } = this.props;
    if(this.context.user) return <Redirect to='/ideas' />
    return (
      <div className={classes.container}>
          <form className={classes.form} onSubmit={(e) => this.handleSubmit(e)}>
            <h2 className={classes.h2} >Log In</h2>
            {this.state.errors ? (
              <SnackbarContent
                message="Ooops there were some errors. Make sure you provided the correct email and password"
              /> ) : null }
            <TextField
              label="Email"
              className={classes.textField}
              onChange={(e) => this.handleChangeEmail(e.target.value)}
                 
            />
            <TextField
              label="Password"
              className={classes.textField}
              onChange={(e) => this.handleChangePassword(e.target.value)}
            />
            <Button size="medium" type="submit" className={classes.button} >
              LOG IN 
            </Button>
            <Link to='/'>
              Dont have an account? Create an account
            </Link>
        </form>

      </div>
    );
  }
}

Login.contextType = AuthContext;

export default withStyles(styles)(Login);
