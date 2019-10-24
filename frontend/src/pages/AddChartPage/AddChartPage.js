import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import ReactJson from 'react-json-view';
import demosMap from './ChartDemos';

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
      <Grid item container xs={12} md={12} direction="row" alignItems="flex-start" justify="space-around">
        <Grid item container xs={6} direction="column" justify="space-around" alignItems="stretch">
          {demosMap.map(({ title, component: Component }) => (
            <Grid item xs={12} md={12} key={title}>
              <Paper className={classNames.chartPaper}>
                <Typography
                  align="center"
                  color="textPrimary"
                  gutterBottom
                  component="h5"
                  className={classNames.chartHeader}
                >
                  {title}
                </Typography>
                <Component />
              </Paper>
            </Grid>
          ))}
        </Grid>
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
      </Grid>
    </Grid>
  );
};

export default AddChartPage;
