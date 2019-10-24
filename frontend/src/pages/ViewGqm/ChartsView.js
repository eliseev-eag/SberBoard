import React, { useContext } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Grid, makeStyles } from '@material-ui/core';
import { CHART_HEIGHT, CHART_MARGINS, ChartTypesEnum } from '../constants';
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
        <Grid item xs={12} key={chartParams.id}>
          <ResponsiveContainer height={CHART_HEIGHT} width="100%">
            <LineChart data={data} margin={CHART_MARGINS}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={chartParams.xAxis} />
              <YAxis dataKey={chartParams.yAxis} />
              <Legend />
              <Tooltip />
              {chartParams.measures.map(it => (
                <Line type="monotone" dataKey={it.dataField} stroke="#8884d8" key={it.dataField} />
              ))}
            </LineChart>
          </ResponsiveContainer>
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
    <Grid container spacing={3} className={classNames.container}>
      {issues && chartsMock.map(it => renderChart(it, issues))}
    </Grid>
  );
};

export default ChartsView;
