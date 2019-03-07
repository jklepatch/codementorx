import React, { Component } from 'react';
import IdeaList from './IdeaList';

class IdeasContainer extends Component {
  state = {
    ideas: [],
    errors: []
  }

  reloadIdeas = async () => {
    const ideas = await this.props.api.getIdeas();
    this.setState({ideas});
  }

  createIdea = async (idea) => {
    const resp = await this.props.api.createIdea(idea);
    const jsonResp = await resp.json();
    if(typeof jsonResp.errors !== 'undefined') {
      this.setState({errors: jsonResp.errors });
      return; 
    }
    //this.reloadIdeas();
  }

  async updateIdea() {
  }

  async deleteIdea(idea) {
  }

  //async componentDidMount() {
  //  this.reloadIdeas();
  //}

  render() {
    const { ideas, errors } = this.state;
    return (
      <IdeaList 
        ideas={ideas} 
        errors={errors} 
        createIdea={this.createIdea}
        updateIdea={this.updateIdea}
        deleteIdea={this.deleteIdea}
      />
    );
  }
};

export default IdeasContainer;
