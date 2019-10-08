import React from 'react';
import { AppBar, Toolbar, IconButton, Fab, Button, makeStyles } from '@material-ui/core';
import { Add, Menu } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
    flexShrink: 0,
    width: '100vw',
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
    </div>
  );
};

export default App;
