import { AddChartPage, MainPage } from './pages';
import { addChartRoute } from './routes';

const pagesMap = [
  { route: `/${addChartRoute}`, component: AddChartPage, title: 'Добавление графика' },
  { route: '/', component: MainPage, title: 'SberBoard' },
];

export default pagesMap;
