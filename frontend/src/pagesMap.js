import { AddChartPage, MainPage, ReactMetricsPage, ViewGqm } from './pages';
import { addChartRoute, homeRoute, reactMetricsRoute, viewGqmRoute } from './routes';

const pagesMap = [
  { route: reactMetricsRoute, component: ReactMetricsPage, title: 'Метрики React' },
  { route: addChartRoute, component: AddChartPage, title: 'Добавление графика' },
  { route: viewGqmRoute, component: ViewGqm, title: 'Просмотр графика' },
  { route: homeRoute, component: MainPage, title: 'SberBoard' },
];

export default pagesMap;
