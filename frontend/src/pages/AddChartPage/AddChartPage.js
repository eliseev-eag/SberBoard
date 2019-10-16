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
}));

const AddChartPage = () => {
  const styles = useStyles();

  return (
    <Grid container spacing={3}>
      {demosMap.map(({ title, component: Component }) => (
        <Grid item xs={12} md={6} key={title}>
          <Paper className={styles.chartPaper}>
            <Typography align="center" color="textPrimary" gutterBottom component="h5" className={styles.chartHeader}>
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
