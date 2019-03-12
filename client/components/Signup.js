import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { Redirect, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { AuthContext } from '../AuthContext';

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

class Signup extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    email: '',
    name: '',
    password: '',
    errors: undefined 
  }

  async handleSubmit (e) {
    e.preventDefault();
    const { errors, ...rest } = this.state;
    const resp = await this.context.api.signup(rest);
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

  handleChangeName(name) {
    this.setState({name});
  }

  handleChangePassword(password) {
    this.setState({password});
  }

  render() {
    const { classes } = this.props;
    if(this.context.user) return <Redirect to='/ideas' />
    return (
      <div className={classes.container}>
          <form className={classes.form} onSubmit={(e) => this.handleSubmit(e)} >
            <h2 className={classes.h2} >Sign Up</h2>
            {this.state.errors ? (
              <SnackbarContent
                message="Ooops there were some errors. Make sure you provided a non-empty email, name and password. Password must be at least 8 characters long, contain 1 lowercase character, 1 uppercase, and 1 digit"
              /> ) : null }
            <TextField
              label="Email"
              className={classes.textField}
              onChange={(e) => this.handleChangeEmail(e.target.value)}
            />
            <TextField
              label="Name"
              className={classes.textField}
              onChange={(e) => this.handleChangeName(e.target.value)}
            />
            <TextField
              label="Password"
              className={classes.textField}
              onChange={(e) => this.handleChangePassword(e.target.value)}
            />
            <Button size="medium" type="submit" className={classes.button} >
              SIGN UP
            </Button>
            <Link to='/login'>
              Already have an account? Login
            </Link>
        </form>

      </div>
    );
  }
}

Signup.contextType = AuthContext;

export default withRouter(withStyles(styles)(Signup));
