import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import demosMap from './ChartDemos';

const useStyles = makeStyles(theme => ({
  chartPaper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
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
      <Grid item container xs={12} md={12} direction="row" alignItems="center" justify="space-around">
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
        <Grid item container xs={6} direction="column" justify="space-around" alignItems="center">
          <Typography color="primary" align="center" component="h4" className={classNames.title}>
            Выберите тип графика для продолжения
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddChartPage;
