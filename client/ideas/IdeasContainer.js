import React, { Component } from 'react';
import IdeaList from './IdeaList';

class IdeasContainer extends Component {
  state = {
    ideas: [],
    errors: []
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

  async updateIdea() {
  }

  async deleteIdea(idea) {
  }

  async componentDidMount() {
    await this.reloadIdeas();
  }

  render() {
    const { ideas, errors } = this.state;
    return (
      <IdeaList 
        ideas={ideas} 
        errors={errors} 
        createIdea={this.createIdea}
        updateIdea={this.updateIdea}
        deleteIdea={this.deleteIdea}
        addIdea={this.addIdea}
        cancelIdea={this.cancelIdea}
      />
    );
  }
};

export default IdeasContainer;
