import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import ConfirmImg from '../images/Confirm_V.png';
import CancelImg from '../images/Cancel_X.png';
import EditImg from '../images/pen.png';
import DeleteImg from '../images/bin.png';

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

class IdeaSingle extends Component {
  static defaultProps = {
    impact: 10,
    ease: 10,
    confidence: 10,
    isEditing: false
  }

  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      impact: props.impact,
      ease: props.ease,
      confidence: props.confidence,
      isEditing : props.isEditing
    };
  }

  updateIdea() {
  }

  deleteIdea() {
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleConfirm = () => {
    //this.props.updateIdea or this.props.createIdea depending if new ida or not
    if(this.props.isNew) {
      this.props.createIdea({
        content: this.state.content,
        impact: this.state.impact,
        ease: this.state.ease,
        confidence: this.state.confidence
      });
    }
  }

  handleEdit = () => {
    //@TODO
  }

  handleCancel = () => {
    this.props.cancelIdea(this.props.id);
  }

  handleDelete = () => {
    //@TODO
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
    const { classes } = this.props;
    const { content, impact, ease, confidence, isEditing } = this.state;
    return (
      <tr>
        <td><span className={classes.bullet}>&bull;</span></td>
        <td className={classes.content}>
          {isEditing ? ( 
            <TextField
              className={classes.content}
              name='content'
              onChange={(e) => this.handleChange(e)}
            />
           ) : content}
        </td>
        <td>
          { isEditing ? this.renderSelect('impact') : impact}
        </td>
        <td>
          { isEditing ? this.renderSelect('ease') : ease}
        </td>
        <td>
          { isEditing ? this.renderSelect('confidence') : confidence}
        </td>
        <td>
          {((parseInt(impact) + parseInt(ease) + parseInt(confidence)) / 3).toFixed(2)}
        </td>
        <td>
          { isEditing ? (
            <a href='#' onClick={(e) => this.handleConfirm()}><img src={ConfirmImg} /></a>
          ) : <a href='#' onClick={(e) => this.handleEdit()}><img src={EditImg} /></a>}
        </td>
        <td>
          { isEditing ? (
            <a href='#' onClick={(e) => this.handleCancel()}><img src={CancelImg} /></a>
          ) : <a href='#' onClick={(e) => this.handleDelete()}><img src={DeleteImg} /></a>}
        </td>
      </tr>
    );
  }
}

export default withStyles(styles)(IdeaSingle);
