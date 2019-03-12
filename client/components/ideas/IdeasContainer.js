import React, { Component, Fragment } from 'react';
import IdeaList from './IdeaList';
import Modal from './Modal';

class IdeasContainer extends Component {
  state = {
    ideas: [],
    errors: [],
    isModal: false,
    toDelete: undefined
  }

  reloadIdeas = async () => {
    const resp = await this.props.api.getIdeas();
    const jsonResp = await resp.json();
    this.setState({ideas: jsonResp});
  }

  createIdea = async (idea) => {
    const resp = await this.props.api.createIdea(idea);
    const jsonResp = await resp.json();
    if(typeof jsonResp.errors !== 'undefined') {
      this.setState({errors: jsonResp.errors });
      return; 
    }
    await this.reloadIdeas();
  }

  //This just add a temporary idea on the frontend
  addIdea = () => {
    this.setState(state => (
      {ideas: [...state.ideas, {
        id: (new Date()).getTime(), 
        content: '', 
        impact: 10, 
        ease: 10, 
        confidence: 10, 
        isEditing: true,
        isNew: true
      }]}
    ));
  }

  cancelIdea = (id) => {
    this.setState(state => (
      {ideas: state.ideas.filter((idea) => idea.id != id)}
    ));
  }

  updateIdea = async (id, update) => {
    const resp = await this.props.api.updateIdea(id, update);
    const jsonResp = await resp.json();
    if(typeof jsonResp.errors !== 'undefined') {
      this.setState({errors: jsonResp.errors });
      return; 
    }
    await this.reloadIdeas();
  }

  deleteIdea = (id) => {
    this.setState({isModal: true, toDelete: id});
  }

  handleAgree = async () => {
    const resp = await this.props.api.deleteIdea(this.state.toDelete);
    //json parsing fail here?
    //const jsonResp = await resp.json();
    //if(typeof jsonResp.errors !== 'undefined') {
    //  this.setState({errors: jsonResp.errors });
    //  return; 
    //}
    this.setState({isModal: false, toDelete: null});
    await this.reloadIdeas();
  }

  handleDisagree = async () => {
    this.setState({isModal: false, toDelete: null});
    await this.reloadIdeas();
  }

  async componentDidMount() {
    const resp = await this.reloadIdeas();
  }

  render() {
    const { ideas, errors, isModal } = this.state;
    return (
      <Fragment>
        <Modal 
          isModal={isModal} 
          handleAgree={this.handleAgree} 
          handleDisagree={this.handleDisagree} 
        />
        <IdeaList 
          ideas={ideas} 
          errors={errors} 
          createIdea={this.createIdea}
          updateIdea={this.updateIdea}
          deleteIdea={this.deleteIdea}
          addIdea={this.addIdea}
          cancelIdea={this.cancelIdea}
        />
      </Fragment>
    );
  }
};

export default IdeasContainer;
