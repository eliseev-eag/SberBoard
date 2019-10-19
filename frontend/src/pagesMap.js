import { AddChartPage, MainPage } from './pages';
import { addChartRoute, homeRoute } from './routes';

const pagesMap = [
  { route: addChartRoute, component: AddChartPage, title: 'Добавление графика' },
  { route: homeRoute, component: MainPage, title: 'SberBoard' },
];

export default pagesMap;
