import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ideaPoolImg from './images/IdeaPool_icon.png';
import { AuthConsumer } from './AuthContext';

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
  }
});

const Sidebar = ({ classes }) => (
  <AuthConsumer>
    {({user}) => (
      <div className={classes.container}>
        <img src={ideaPoolImg} />
        <p>The Idea Pool</p>
        {user &&
          <div>
            <hr />
            <p>Pic</p>
            <p>{user.name}</p>
            <a>Logout</a>
          </div>
        }
      </div>
    )}
  </AuthConsumer>
);

export default withStyles(styles)(Sidebar);
