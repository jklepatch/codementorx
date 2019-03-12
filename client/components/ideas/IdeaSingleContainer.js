import React, { Component } from 'react';
import IdeaSingleView from './IdeaSingleView';
import IdeaSingleEdit from './IdeaSingleEdit';

class IdeaSingleContainer extends Component {
  state = {
    isEditing: this.props.isEditing,
    isModal: false
  }

  static defaultProps = {
    impact: 10,
    ease: 10,
    confidence: 10,
    isEditing: false
  }

  handleConfirm = ({content, impact, ease, confidence}) => {
    if(this.props.isNew) {
      this.props.createIdea({
        content,
        impact,
        ease,
        confidence
      });
      return;
    }
    this.props.updateIdea(this.props.id, {
      content,
      impact,
      ease,
      confidence
    });
    this.setState({isEditing: false});
  }

  handleCancel = () => {
    if(this.props.isNew) {
      this.props.cancelIdea(this.props.id);
      return;
    }
    this.setState({isEditing: false});
  }

  handleEdit = () => {
    this.setState({isEditing: true});
  }

  handleDelete = () => {
    this.props.deleteIdea(this.props.id);
  }

  render() {
    const { content, impact, ease, confidence} = this.props;
    if(this.state.isEditing) {
      return (
        <IdeaSingleEdit 
          content={content}
          impact={impact}
          ease={ease}
          confidence={confidence}
          handleConfirm={this.handleConfirm}
          handleCancel={this.handleCancel}
        />
      );
    }
    return (
      <IdeaSingleView
        content={content}
        impact={impact}
        ease={ease}
        confidence={confidence}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
      />
    );
  }
}

export default IdeaSingleContainer;
