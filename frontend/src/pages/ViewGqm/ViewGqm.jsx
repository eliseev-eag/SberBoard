import React, { useEffect, useState } from 'react';
import {
  generatePath,
  Redirect,
  Switch,
  Route,
  Link as RouterLink,
  useParams,
  useLocation,
  matchPath,
} from 'react-router-dom';
import { AppBar, Grid, Tab, Tabs, makeStyles } from '@material-ui/core';
import Graph from '../../components/Graph';
import { chartsTabRoute, gqmTabRoute } from '../../routes';
import ChartsView from './ChartsView';

const useStyles = makeStyles(theme => ({
  wrapper: {
    minWidth: '100%',
    minHeight: 'calc(100vh - 100px)',
  },
  content: {
    marginTop: theme.spacing(4),
  },
}));

const ViewGqm = () => {
  const { pathname } = useLocation();
  const { goalId } = useParams();
  const gqmRoute = generatePath(gqmTabRoute, { goalId });
  const chartRoute = generatePath(chartsTabRoute, { goalId });
  const matchPathToTab = () => {
    let value = 0;

    if (matchPath(pathname, { path: chartRoute }) !== null) {
      return 1;
    }

    return value;
  };

  const [goal, setGoal] = useState(null);
  const [currentTab, setCurrentTab] = useState(matchPathToTab());

  const classNames = useStyles();

  useEffect(() => {
    fetch(`/api/goals/${goalId}?projection=default`)
      .then(response => response.json())
      .then(setGoal);
  }, [goalId]);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  if (goal === null) {
    return null;
  }

  return (
    <Grid container direction="column" alignItems="flex-start" justify="flex-start" className={classNames.wrapper}>
      <AppBar position="static" className={classNames.appBar}>
        <Tabs value={currentTab} onChange={handleChange} className={classNames.appBar}>
          <Tab label="Дерево" value={0} component={RouterLink} to={gqmRoute} />
          <Tab label="Метрики" value={1} component={RouterLink} to={chartRoute} />
        </Tabs>
      </AppBar>
      <Grid item container xs={12} className={classNames.content}>
        <Switch>
          <Route path={gqmTabRoute} render={() => <Graph model={goal} />} />
          <Route path={chartsTabRoute} render={() => <ChartsView />} />
          <Redirect to={gqmRoute} />
        </Switch>
      </Grid>
    </Grid>
  );
};

export default ViewGqm;
