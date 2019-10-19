import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import App from './App';
import 'typeface-roboto';

const AppWrapper = () => (
  <HashRouter>
    <CssBaseline />
    <App />
  </HashRouter>
);

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
