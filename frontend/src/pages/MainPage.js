import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Grid, makeStyles, Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { addChartRoute } from '../routes';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const MainPage = () => {
  const classes = useStyles();

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch(`/api/goals?projection=default`)
      .then(response => response.json())
      .then(it => setGoals(it._embedded.goals));
  }, []);

  return (
    <>
      <Fab color="primary" aria-label="add" className={classes.fab} component={RouterLink} to={addChartRoute}>
        <Add />
      </Fab>
      <Grid item container xs={12} justify="space-between" alignItems="center">
        {goals.map(it => (
          <Grid item xs={4}>
            <Paper className={classes.paper}>{it.name}</Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MainPage;
