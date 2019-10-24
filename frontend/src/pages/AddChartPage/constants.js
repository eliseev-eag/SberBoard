import { uniqueId } from 'lodash-es';

export const REQUIRED_FIELD_MESSAGE = 'Поле обязательно';

export const REQUIRED_FIELDS = ['xAxis', 'yAxis', 'measures[0].dataField'];

export const INITIAL_MEASURE = {
  dataField: null,
};

export const INITIAL_CHART_SETTINGS = {
  xAxis: null,
  yAxis: null,
  chartType: null,
  measures: [{ ...INITIAL_MEASURE, id: uniqueId() }],
};
