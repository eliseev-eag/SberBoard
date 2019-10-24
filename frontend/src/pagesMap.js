import { AddChartPage, MainPage, ViewGqm } from './pages';
import { addChartRoute, homeRoute, viewGqmRoute } from './routes';

const pagesMap = [
  { route: addChartRoute, component: AddChartPage, title: 'Добавление графика' },
  { route: viewGqmRoute, component: ViewGqm, title: 'Просмотр графика' },
  { route: homeRoute, component: MainPage, title: 'SberBoard' },
];

export default pagesMap;
