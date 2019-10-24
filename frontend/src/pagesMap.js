import { AddChartPage, CreateGoalPage, MainPage, ReactMetricsPage, ViewGqm } from './pages';
import { addChartRoute, addGoalRoute, homeRoute, reactMetricsRoute, viewGqmRoute } from './routes';

const pagesMap = [
  { route: reactMetricsRoute, component: ReactMetricsPage, title: 'Метрики React' },
  { route: addGoalRoute, component: CreateGoalPage, title: 'Добавление цели' },
  { route: addChartRoute, component: AddChartPage, title: 'Добавление графика' },
  { route: viewGqmRoute, component: ViewGqm, title: 'Просмотр графика' },
  { route: homeRoute, component: MainPage, title: 'SberBoard' },
];

export default pagesMap;
