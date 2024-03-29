import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import ConfirmImg from '../../images/Confirm_V.png';
import CancelImg from '../../images/Cancel_X.png';

const styles = {
  content: {
    width: '100%',
    textAlign: 'left'
  },
  bullet: {
    color: '#AAAFB3'
  },
  select: {
    width: '50',
    backgroundImage: 'linear-gradient(to bottom, #EEE, #D8D8D8)',
    border: 'solid 1px #BBB',
    borderRadius: '5',
    fontSize: '0.8em',
    padding: '0.25em'
  }
};

class IdeaSingleEdit extends Component {
  state = {
    content: this.props.content,
    impact: this.props.impact,
    ease: this.props.ease, 
    confidence: this.props.confidence 
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  renderSelect = (model) => {
    const { classes } = this.props;
    return (
      <FormControl variant="outlined">
        <Select
          value={this.state[model]}
          onChange={this.handleChange}
          name={model}
            input={
              <InputBase 
                className={classes.select}
                value={this.state.content}
                name={model} 
                id={model} />
            }
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
            <MenuItem value={number} key={number}>{number}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  render() {
    const { classes, handleConfirm, handleCancel } = this.props;
    const { content, impact, ease, confidence } = this.state;
    return (
      <tr>
        <td><span className={classes.bullet}>&bull;</span></td>
        <td className={classes.content}>
          <TextField
            className={classes.content}
            name='content'
            onChange={(e) => this.handleChange(e)}
            value={content}
          />
        </td>
        <td>{this.renderSelect('impact')}</td>
        <td>{this.renderSelect('ease')}</td>
        <td>{this.renderSelect('confidence')}</td>
        <td>{((parseInt(impact) + parseInt(ease) + parseInt(confidence)) / 3).toFixed(2)}</td>
        <td><a href='#' onClick={(e) => handleConfirm({content, impact, ease, confidence})}><img src={ConfirmImg} /></a></td>
        <td><a href='#' onClick={(e) => handleCancel()}><img src={CancelImg} /></a></td>
      </tr>
    );
  }
}

export default withStyles(styles)(IdeaSingleEdit);
