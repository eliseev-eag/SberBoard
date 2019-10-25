import React, { useEffect, useState } from 'react';
import {
  generatePath,
  Link as RouterLink,
  matchPath,
  Redirect,
  Route,
  Switch,
  useLocation,
  useParams,
} from 'react-router-dom';
import { AppBar, Grid, makeStyles, Tab, Tabs } from '@material-ui/core';
import Graph from '../../components/Graph';
import { chartsTabRoute, gqmTabRoute } from '../../routes';
// import ChartsView from './ChartsView';
import ReactMetricsPage from '../ReactMetricsPage';

const useStyles = makeStyles(theme => ({
  wrapper: {
    minWidth: '100%',
  },
  content: {
    marginTop: theme.spacing(4),
    height: 'calc(100vh - 210px)',
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
    <>
      <AppBar position="static" className={classNames.appBar}>
        <Tabs value={currentTab} onChange={handleChange} className={classNames.appBar}>
          <Tab label="Дерево" value={0} component={RouterLink} to={gqmRoute} />
          <Tab label="Метрики" value={1} component={RouterLink} to={chartRoute} />
        </Tabs>
      </AppBar>
      <Grid container xs={12} className={classNames.content}>
        <Switch>
          <Route path={gqmTabRoute} render={() => <Graph model={goal} />} />
          <Route path={chartsTabRoute} render={() => <ReactMetricsPage />} />
          <Redirect to={gqmRoute} />
        </Switch>
      </Grid>
    </>
  );
};

export default ViewGqm;
