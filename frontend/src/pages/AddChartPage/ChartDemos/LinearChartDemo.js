import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CHART_HEIGHT, CHART_MARGINS } from '../../constants';
import { DATA_MOCK } from './constants';

const LinearChartDemo = () => (
  <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
    <LineChart data={DATA_MOCK} margin={CHART_MARGINS}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
);

export default LinearChartDemo;
