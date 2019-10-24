import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';
import Graph from '../../components/Graph';
import ChartsView from './ChartsView';

const fake = {
  description: 'Сократить кол-во задач типа "баг" на спринт до 10.',
  questions: [
    {
      text: 'Баг появился из-за слабого описания ТЗ?',
      metrics: [
        {
          name: 'Процент багов с тегом "requirement missing".',
        }
      ],
    },
    {
      text: 'Баг появился из-за отсутствия тестов функционала?',
      metrics: [
        {
          name: 'Количество переоткрытий багов.',
        },
        {
          name: 'Code coverage.',
        },
      ],
    },
    {
      text: 'Баг пропущен группой тестирования?',
      metrics: [
        {
          name: 'Процент багов с тегом "slipped bug"',
        },
      ],
    },
    {
      text: 'Каково качество кода?',
      metrics: [
        {
          name: 'Кол-во ошибок статического анализатора',
        },
        {
          name: 'Кол-во замечаний SonarQube',
        },
      ],
    },
    {
      text: 'Какова сложность проекта?',
      metrics: [
        {
          name: 'Цикломатическая сложность проекта',
        },
        {
          name: 'Кол-во строк кода',
        },
        {
          name: 'Кол-во файлов в проекте',
        },
        {
          name: 'Кол-во публичных методов',
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
        <div style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
          <ChartsView />
        </div>
      </TabPanel>
    </>
  );
};

export default ViewGqm;
