import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const AddChartPage = () => {
  const styles = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={styles.header}>
        <Typography color="primary" gutterBottom>
          Создание графика
        </Typography>
      </Paper>
    </Grid>
  );
};

export default AddChartPage;
