import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Container, Grid, makeStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import pages from './pagesMap';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const App = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const currentPage = pages.find(({ route }) => pathname.includes(route));

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography component="h1" className={classes.title}>
            {currentPage.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Switch>
              {pages.map(({ route, component }) => (
                <Route path={route} component={component} key={route} />
              ))}
            </Switch>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default App;
