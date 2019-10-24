import React, { useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { AddBoxOutlined } from '@material-ui/icons';
import { addGoalRoute, viewGqmRoute } from '../routes';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  goal: {
    width: 300,
    height: 300,
    padding: theme.spacing(2),
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  },
  goalHeader: {
    fontSize: 28,
  },
  addGoalButton: {
    border: '2px dashed #e0e0e0',
  },
  addGoalButtonIcon: {
    color: '#e0e0e0',
    fontSize: theme.typography.fontSize * 5,
  },
}));

const MainPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(`/api/goals?projection=default`)
      .then(response => response.json())
      .then(it => setGoals(it._embedded.goals));
  }, []);

  return (
    <Grid item container xs={12} justify="flex-start" alignItems="flex-start">
      {goals.map(it => (
        <Paper
          className={classes.goal}
          key={it.name}
          onClick={() => history.push(generatePath(viewGqmRoute, { goalId: it.id }))}
        >
          <Typography component="h5" color="primary" className={classes.goalHeader}>
            {it.name}
          </Typography>
        </Paper>
      ))}
      <Paper className={`${classes.goal} ${classes.addGoalButton}`} onClick={() => history.push(addGoalRoute)}>
        <AddBoxOutlined className={classes.addGoalButtonIcon} />
      </Paper>
    </Grid>
  );
};

export default MainPage;
