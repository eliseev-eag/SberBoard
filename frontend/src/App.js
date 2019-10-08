import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Add, Menu } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <div className={classes.grow} />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <Add />
      </Fab>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
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
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default App;
