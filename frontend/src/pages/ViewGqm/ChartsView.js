import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Grid, makeStyles } from '@material-ui/core';
import { ChartTypesEnum, CHART_HEIGHT, CHART_MARGINS } from '../constants';
import { ReactMetricsContext } from '../../dataContext';

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

const renderChart = (chartParams, data) => {
  switch (chartParams.type) {
    case ChartTypesEnum.linear:
      return (
        <Grid container key={chartParams.id}>
          <Grid item xs={12} md={6}>
            <LineChart width={1250} height={CHART_HEIGHT} data={data} margin={CHART_MARGINS}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={chartParams.xAxis} />
              <YAxis dataKey={chartParams.yAxis} />
              <Tooltip />
              <Legend />
              {chartParams.measures.map(it => (
                <Line type="monotone" dataKey={it.dataField} stroke="#8884d8" key={it.dataField} />
              ))}
            </LineChart>
          </Grid>
        </Grid>
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
      {issues && chartsMock.map(it => renderChart(it, issues))}
    </Grid>
  );
};

export default ChartsView;
