import React, { useEffect, useState } from 'react';
import { Link as RouterLink, matchPath, Route, Switch, useLocation } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Home, InsertChart, Menu } from '@material-ui/icons';
import { ReactMetricsContext } from './dataContext';
import pages from './pagesMap';
import { homeRoute, reactMetricsRoute } from './routes';

const theme = createMuiTheme({
  palette: {
    primary: { light: '#00b060', main: '#2a9f30' },
    secondary: { main: '#9a3fd5', light: '#ffd300', dark: '#6c0aab' },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu: { minWidth: 250 },
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
  const [issues, updateIssues] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const classes = useStyles();
  const { pathname } = useLocation();
  const currentPage = pages.find(({ route }) => matchPath(pathname, { path: route }) !== null);

  const closeDrawer = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setShowMenu(false);
  };

  useEffect(() => {
    fetch('/metrics/react')
      .then(response => response.json())
      .then(updateIssues);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <ReactMetricsContext.Provider value={issues}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setShowMenu(true)}
              >
                <Menu />
              </IconButton>
              <Typography component="h1" className={classes.title}>
                {currentPage.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer open={showMenu} onClose={() => setShowMenu(false)}>
            <List className={classes.menu} onClick={closeDrawer} onKeyDown={closeDrawer}>
              <ListItem button component={RouterLink} to={homeRoute}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="SberBoard" />
              </ListItem>
            </List>
            <List className={classes.menu} onClick={closeDrawer} onKeyDown={closeDrawer}>
              <ListItem button component={RouterLink} to={reactMetricsRoute}>
                <ListItemIcon>
                  <InsertChart />
                </ListItemIcon>
                <ListItemText primary="ReactMetrics" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <Container maxWidth={false} className={classes.container}>
              <Switch>
                {pages.map(({ route, component }) => (
                  <Route path={route} component={component} key={route} />
                ))}
              </Switch>
            </Container>
          </main>
        </div>
      </ReactMetricsContext.Provider>
    </MuiThemeProvider>
  );
};

export default App;
