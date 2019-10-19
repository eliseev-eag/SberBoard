import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import demosMap from './ChartDemos';

const useStyles = makeStyles(theme => ({
  chartPaper: {
    padding: theme.spacing(2),
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
}));

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
      {demosMap.map(({ title, component: Component }) => (
        <Grid item xs={12} md={6} key={title}>
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
  );
};

export default AddChartPage;
