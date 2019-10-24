import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CHART_HEIGHT, CHART_MARGINS } from '../constants';
import { DATA_MOCK } from './constants';

const BarChartDemo = () => (
  <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
    <BarChart data={DATA_MOCK} margin={CHART_MARGINS}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
);

export default BarChartDemo;
