import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';
import Graph from '../../components/Graph';
import ChartsView from './ChartsView';

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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Graph />
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
