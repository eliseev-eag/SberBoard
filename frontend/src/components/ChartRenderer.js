import React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Grid } from '@material-ui/core';
import { CHART_HEIGHT, CHART_MARGINS, ChartTypesEnum } from '../pages/constants';
import { getRandomColor } from '../helpers';

const ChartRenderer = ({ chartParams, data }) => {
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
                <Line type="monotone" dataKey={it.dataField} key={it.dataField} stroke={getRandomColor()} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      );
    case ChartTypesEnum.bar:
      return (
        <Grid item xs={12} key={chartParams.id}>
          <ResponsiveContainer height={CHART_HEIGHT} width="100%">
            <BarChart data={data} margin={CHART_MARGINS}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={chartParams.xAxis} />
              <YAxis dataKey={chartParams.yAxis} />
              <Legend />
              <Tooltip />
              {chartParams.measures.map(it => (
                <Bar type="monotone" dataKey={it.dataField} key={it.dataField} fill={getRandomColor()} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      );
    case ChartTypesEnum.pie:
      return (
        <Grid item xs={12} key={chartParams.id}>
          <ResponsiveContainer height={CHART_HEIGHT} width="100%">
            <PieChart margin={CHART_MARGINS}>
              {chartParams.measures.map((it, index) => (
                <Pie
                  data={data}
                  dataKey={it.dataField}
                  nameKey={chartParams.xAxis}
                  cx="50%"
                  cy="50%"
                  innerRadius={index > 0 ? 50 * index + 10 : undefined}
                  outerRadius={50 + index * 30}
                  fill={getRandomColor()}
                />
              ))}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      );
    default:
      return null;
  }
};

export default ChartRenderer;