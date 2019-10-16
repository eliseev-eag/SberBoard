import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Container, Grid, makeStyles, CssBaseline } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { AddChartPage, MainPage } from './pages';
import { addChartRoute } from './routes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
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
}));

const App = () => {
  const classes = useStyles();

  return (
    <HashRouter>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <div className={classes.grow}></div>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Switch>
                <Route path={`/${addChartRoute}`} component={AddChartPage} />
                <Route path="/" component={MainPage} />
              </Switch>
            </Grid>
          </Container>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
