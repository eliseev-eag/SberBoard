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
}));

const AddChartPage = () => {
  const className = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Typography color="primary" align="center" component="h4" className={className.title}>
          Выберите тип графика для продолжения
        </Typography>
      </Grid>
      {demosMap.map(({ title, component: Component }) => (
        <Grid item xs={12} md={6} key={title}>
          <Paper className={className.chartPaper}>
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              component="h5"
              className={className.chartHeader}
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
