import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Idea from './IdeaSingleContainer';
import BulbImg from '../../images/bulb.png';
import AddIdeaImg from '../../images/btn_addanidea.png';

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
    fontSize: '0.8em'
  },
  ease: {
    fontWeight: 'normal',
    fontSize: '0.8em'
  },
  confidence: {
    fontWeight: 'normal',
    fontSize: '0.8em'
  },
  scoreCol: {
    display: 'inline-block',
    width: '80px'
  },
  avg: {
    fontSize: '0.8em',
    width: '80'
  },
  noIdea: {
    margin: '200px  auto 0 auto',
    width: '100',
    textAlign: 'center'
  }
};

const IdeaList = (props) => { 
  const { classes, createIdea, updateIdea, deleteIdea, ideas } = props;
  const sorted = ideas.sort((a, b) => {
    const averageA = parseInt(a.ease) + parseInt(a.confidence) + parseInt(a.impact);
    const averageB = parseInt(b.ease) + parseInt(b.confidence) + parseInt(b.impact);
    if(averageA > averageB) return -1;
    if(averageA === averageB) return 0;
    return  1;
  });
  return (
    <div className={classes.container} >
      <div className={classes.titleContainer}>
        <h2 className={classes.title}>My Ideas</h2>
        <a href="#" onClick={(e) => props.addIdea()}><img className={classes.addIdea} src={AddIdeaImg} /></a>
      </div>
      <Divider />
      {sorted.length > 0 ? (
        <table className={classes.table}>
          <thead className={classes.tableHeader}>
            <tr>
              <th></th>
              <th className={classes.content}></th>
              <th className={classes.impact}><span className={classes.scoreCol}>Impact</span></th>
              <th className={classes.ease}><span className={classes.scoreCol}>Ease</span></th>
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
                updateIdea={updateIdea}
                deleteIdea={deleteIdea}
                cancelIdea={props.cancelIdea}
              />
            ))}
          </tbody>
        </table>
      ) : <div className={classes.noIdea}><img src={BulbImg} /><p>Got Ideas?</p></div>}
    </div>
  );
}

export default withStyles(styles)(IdeaList);
