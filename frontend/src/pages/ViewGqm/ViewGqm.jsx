import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';
import Graph from '../../components/Graph';

const fake = {
  description: 'Goal',
  questions: [
    {
      text: 'question 1',
      metrics: [
        {
          name: 'first',
        },
        {
          name: 'second',
        },
      ],
    },
    {
      text: 'question 2',
      metrics: [
        {
          name: 'first 2',
        },
        {
          name: 'second 2',
        },
      ],
    },
    {
      text: 'question 3',
      metrics: [
        {
          name: 'first 3',
        },
      ],
    },
  ],
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} style={{ width: '100%' }} {...other}>
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const ViewGqm = () => {
  const [goal, setGoal] = useState(null);
  const [value, setValue] = useState(0);
  const { goalId } = useParams();

  useEffect(() => {
    fetch(`/api/goals/${goalId}`)
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
          <Tab label="Дерево" />
          <Tab label="Метрики" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
          <Graph model={goal} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </>
  );
};

export default ViewGqm;
