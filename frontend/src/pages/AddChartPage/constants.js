import { uniqueId } from 'lodash-es';

export const CHART_HEIGHT = 300;

export const CHART_MARGINS = {
  top: 8,
  right: 16,
  left: 8,
  bottom: 8,
};

export const ChartTypesEnum = {
  linear: 'linear',
  pie: 'pie',
  bar: 'bar',
};

export const REQUIRED_FIELD_MESSAGE = 'Поле обязательно';

export const REQUIRED_FIELDS = ['xAxis', 'yAxis', 'chartType', 'measures[0].dataField'];

export const INITIAL_MEASURE = {
  dataField: null,
};

export const INITIAL_CHART_SETTINGS = {
  xAxis: null,
  yAxis: null,
  chartType: null,
  measures: [{ ...INITIAL_MEASURE, id: uniqueId() }],
};
