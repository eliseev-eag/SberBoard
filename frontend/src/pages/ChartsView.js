import React, { useContext, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Grid, makeStyles } from '@material-ui/core';
import { ChartTypesEnum, CHART_HEIGHT, CHART_MARGINS } from './constants';
import { ReactMetricsContext } from '../dataContext';

const chartsMock = [
  {
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
  loader: theme.spacing(2),
}));

const renderChart = (chartParams, data) => {
  switch (chartParams.type) {
    case ChartTypesEnum.linear:
      return (
        <LineChart data={data} margin={CHART_MARGINS}>
          {chartParams.useGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey={chartParams.xAxis} />
          <YAxis dataKey={chartParams.yAxis} />
          <Tooltip />
          <Legend />
          {chartParams.measures.map(it => (
            <Line dataKey={it.dataField} />
          ))}
        </LineChart>
      );
    default:
      return null;
  }
};

const ChartsView = () => {
  const issues = useContext(ReactMetricsContext);
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
      {chartsMock.map(it => (
        <Grid item container xs={12}>
          <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
            {renderChart(it, issues)}
          </ResponsiveContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default ChartsView;
