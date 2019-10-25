import React, { useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { ChartTypesEnum } from '../constants';
import { ReactMetricsContext } from '../../dataContext';
import { ChartRenderer } from '../../components';

const chartsMock = [
  {
    id: 0,
    type: ChartTypesEnum.linear,
    xAxis: 'date',
    useGrid: true,
    measures: [
      {
        dataField: 'complexity',
      },
    ],
  },
];

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: theme.spacing(3),
  },
}));

const ChartsView = () => {
  const issues = useContext(ReactMetricsContext);
  const classNames = useStyles();

  return (
    <Grid container spacing={3} className={classNames.container}>
      {issues && chartsMock.map(it => <ChartRenderer chartParams={it} data={issues} />)}
    </Grid>
  );
};

export default ChartsView;
