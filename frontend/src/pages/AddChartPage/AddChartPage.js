import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import ReactJson from 'react-json-view';
import CommonChartSettings from './CommonChartSettings';
import { INITIAL_CHART_SETTINGS } from './constants';

const useStyles = makeStyles(theme => ({
  chartPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(0, 2, 2, 2),
  },
  chartHeader: {
    color: theme.palette.primary.main,
    fontSize: 18,
  },
  title: {
    padding: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(3),
  },
  viewerWrapper: {
    fontSize: 18,
  },
}));

const exampleJson = {
  string: 'this is a test string',
  integer: 42,
  array: [1, 2, 3, 'test', NaN],
  float: 3.14159,
  undefined: undefined,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null,
  },
  string_number: '1234',
  date: new Date(),
};

const AddChartPage = () => {
  const [chartSettings, updateChartSettings] = useState(INITIAL_CHART_SETTINGS);
  const classNames = useStyles();

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="space-around"
      alignItems="center"
      className={classNames.container}
    >
      <Grid item xs={12} md={12}>
        <Typography color="primary" align="center" component="h4" className={classNames.title}>
          Выберите тип графика для продолжения
        </Typography>
      </Grid>
      <Grid item container xs={12} md={12} direction="row" alignItems="flex-start" justify="space-between">
        <Grid
          item
          container
          xs={6}
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={classNames.viewerWrapper}
        >
          <ReactJson src={exampleJson} enableClipboard={false} collapsed={3} />
        </Grid>
        <Grid item container xs={6} direction="column" justify="flex-start" alignItems="center">
          <CommonChartSettings onSubmit={updateChartSettings} initialValues={INITIAL_CHART_SETTINGS} />
          <Typography color="primary" align="center" component="h4" className={classNames.title}>
            form values = {JSON.stringify(chartSettings)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddChartPage;
