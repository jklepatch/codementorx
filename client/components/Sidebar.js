import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ideaPoolImg from '../images/IdeaPool_icon.png';
import { AuthConsumer } from '../AuthContext';

const styles = theme => ({
  container: {
    backgroundColor: '#00A843',
    color: 'white',
    width: '200px',
    textAlign: 'center',
    padding: '1em'
  },
  hr: {
    color: 'rgba(255,255,255,0.2)'
  },
  gravatar: {
    borderRadius: '40px'
  },
  logout: {
    color: 'rgba(42,56,66,0.65)',
    textDecoration: 'none'
  }
});

const Sidebar = ({ classes }) => (
  <AuthConsumer>
    {({user, logout}) => (
      <div className={classes.container}>
        <img src={ideaPoolImg} />
        <p>The Idea Pool</p>
        {user &&
          <div>
            <hr />
            <p><img className={classes.gravatar} src={user.avatar_url}/></p>
            <p>{user.name}</p>
            <a className={classes.logout} href='#' onClick={(e) => {e.preventDefault(); logout();}}>Logout</a>
          </div>
        }
      </div>
    )}
  </AuthConsumer>
);

export default withStyles(styles)(Sidebar);
