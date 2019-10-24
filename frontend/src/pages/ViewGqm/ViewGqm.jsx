import React, { useEffect, useState } from 'react';
import { Switch, Route, Link as RouterLink, useParams } from 'react-router-dom';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import Graph from '../../components/Graph';
import { chartsTabRoute, gqmTabRoute } from '../../routes';
import ChartsView from './ChartsView';

const ViewGqm = () => {
  const [goal, setGoal] = useState(null);
  const [value, setValue] = useState(0);
  const { goalId } = useParams();

  useEffect(() => {
    fetch(`/api/goals/${goalId}?projection=default`)
      .then(response => response.json())
      .then(setGoal);
  }, [goalId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (goal === null) {
    return null;
  }

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Дерево" component={RouterLink} to={gqmTabRoute} />
          <Tab label="Метрики" component={RouterLink} to={chartsTabRoute} />
        </Tabs>
      </AppBar>
      <div style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
        <Switch>
          <Route path={gqmTabRoute} render={() => <Graph model={goal} />} />
          <Route path={chartsTabRoute} render={() => <ChartsView />} />
        </Switch>
      </div>
    </>
  );
};

export default ViewGqm;
