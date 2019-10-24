import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { addChartRoute } from '../routes';
import Graph from '../components/Graph';

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

  return (
    <>
      <Fab color="primary" aria-label="add" className={classes.fab} component={RouterLink} to={addChartRoute}>
        <Add />
      </Fab>
      <Grid item container xs={12} direction="column" justify="stretch" alignItems="center">
        <Paper className={classes.paper}>
          <Typography color="primary">Для начала работы добавьте новый график</Typography>
          <div style={{ width: 600, height: 600 }}>
            <Graph />
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default MainPage;
