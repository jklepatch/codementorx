import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import EditImg from '../../images/pen.png';
import DeleteImg from '../../images/bin.png';

const styles = {
  content: {
    width: '100%',
    textAlign: 'left'
  },
  bullet: {
    color: '#AAAFB3'
  },
};

const IdeaSingleView = (props) => {
  return (
    <tr>
      <td><span className={props.classes.bullet}>&bull;</span></td>
      <td className={props.classes.content}>{props.content}</td>
      <td>{props.impact}</td>
      <td>{props.ease}</td>
      <td>{props.confidence}</td>
      <td>{((parseInt(props.impact) + parseInt(props.ease) + parseInt(props.confidence)) / 3).toFixed(2)}</td>
      <td><a href='#' onClick={(e) => props.handleEdit()}><img src={EditImg} /></a></td>
      <td><a href='#' onClick={(e) => props.handleDelete()}><img src={DeleteImg} /></a></td>
    </tr>
  );
};

export default withStyles(styles)(IdeaSingleView);
