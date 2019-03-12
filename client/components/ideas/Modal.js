import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  agree: {
    color: '#00A843'
  },
  disagree: {
    color: 'black' 
  }
};

class Modal extends Component {
  handleAgree = async () => {
    await this.props.handleAgree()
  };

  handleDisagree = async () => {
    await this.props.handleDisagree()
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.isModal}
          onClose={this.handleDisagree}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This idea will be permanently deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDisagree} className={this.props.classes.disagree}>
              Cancel
            </Button>
            <Button onClick={this.handleAgree} className={this.props.classes.agree} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Modal);
