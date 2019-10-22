import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import 'typeface-roboto';

const theme = createMuiTheme({
  palette: { background: { default: '#f0f0f0' } },
});

const AppWrapper = () => (
  <HashRouter>
    <ThemeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ThemeProvider>
  </HashRouter>
);

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
