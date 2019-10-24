import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts';
import { CHART_HEIGHT, CHART_MARGINS } from '../constants';
import { DATA_MOCK } from './constants';

const PieChartDemo = () => (
  <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
    <PieChart margin={CHART_MARGINS}>
      <Pie data={DATA_MOCK} dataKey="pv" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
      <Pie
        data={DATA_MOCK}
        dataKey="uv"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#82ca9d"
        label
      />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default PieChartDemo;
