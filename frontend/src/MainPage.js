import React from 'react';
import { Fab, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <Add />
      </Fab>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <Grid item xs={12} key={index}>
            <Paper className={classes.paper}>
              <Typography color="primary" gutterBottom>
                Header
              </Typography>
              <div>Здесь мог быть ваш контент</div>
            </Paper>
          </Grid>
        ))}
    </>
  );
};

export default MainPage;
