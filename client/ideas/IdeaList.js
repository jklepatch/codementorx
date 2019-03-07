import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Idea from './IdeaSingle';
import BulbImg from '../images/bulb.png';
import AddIdeaImg from '../images/btn_addanidea.png';

const styles = {
  container: {
    padding: '2em 4em',
    flex: '1'
  },
  titleContainer: {
    display: 'flex',
    margin: '0 0 2em 1em'
  },
  title: {
    fontWeight: '100',
    margin: '0',
    lineHeight: '50px',
    flex: 1
  },
  addIdea: {
    alignSelf: 'flex-end',
    width: '50',
    height: '50'
  },
  table: {
    margin: '2em 0 0 1em',
    width: '100%',
    textAlign: 'center'
  },
  tableHeader: {
    lineHeight: '3em'
  },
  content: {
    minWidth: '200',
    textAlign: 'left'
  },
  impact: {
    fontWeight: 'normal',
    fontSize: '0.8em',
    with: '100'
  },
  ease: {
    fontWeight: 'normal',
    fontSize: '0.8em'
  },
  confidence: {
    fontWeight: 'normal',
    fontSize: '0.8em'
  },
  avg: {
    fontSize: '0.8em'
  },
  noIdea: {
    margin: '200px  auto 0 auto',
    width: '100',
    textAlign: 'center'
  }
};

class IdeaList extends Component {
  static defaultProps = {
    ideas: []
  }

  constructor(props) {
    super(props);
    this.state = {
      ideas: props.ideas
    };
  }

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

  render() {
    const { classes, createIdea, updateIdea, deleteIdea } = this.props;
    const { ideas } = this.state;
    return (
      <div className={classes.container} >
        <div className={classes.titleContainer}>
          <h2 className={classes.title}>My Ideas</h2>
          <a href="#" onClick={(e) => this.addIdea()}><img className={classes.addIdea} src={AddIdeaImg} /></a>
        </div>
        <Divider />
        {ideas.length > 0 ? (
          <table className={classes.table}>
            <thead className={classes.tableHeader}>
              <tr>
                <th></th>
                <th className={classes.content}></th>
                <th className={classes.impact}>Impact</th>
                <th className={classes.ease}>Ease</th>
                <th className={classes.confidence}>Confidence</th>
                <th className={classes.avg}>Avg</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => (
                <Idea 
                  {...idea} 
                  key={idea.id} 
                  createIdea={createIdea}
                  updateIdeaIdea={updateIdea}
                  deleteIdea={deleteIdea}
                  cancelIdea={this.cancelIdea}
                />
              ))}
            </tbody>
          </table>
        ) : <div className={classes.noIdea}><img src={BulbImg} /><p>Got Ideas?</p></div>}
      </div>
    );
  }
}

export default withStyles(styles)(IdeaList);
