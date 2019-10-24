import { AddChartPage, ChartsView, MainPage } from './pages';
import { addChartRoute, chartsViewRoute, homeRoute } from './routes';

const pagesMap = [
  { route: addChartRoute, component: AddChartPage, title: 'Добавление графика' },
  { route: chartsViewRoute, component: ChartsView, title: 'ChartsView' },
  { route: homeRoute, component: MainPage, title: 'SberBoard' },
];

export default pagesMap;
