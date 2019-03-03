import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

//const Login = () => (
class Login extends Component {
  onClick() {
    console.log('clicked');
    //@TODO
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <form className={classes.form}>
            <h2 className={classes.h2} >Log In</h2>
            <TextField
              label="Email"
              className={classes.textField}
            />
            <TextField
              label="Password"
              className={classes.textField}
            />
            <Button size="medium" className={classes.button} onClick={() => this.onClick()} >
              LOG IN 
            </Button>
            <Button size="medium" onClick={() => this.onClick()} >
              Dont have an account? Create an account
            </Button>
        </form>

      </div>
    );
  }
}

export default withStyles(styles)(Login);
