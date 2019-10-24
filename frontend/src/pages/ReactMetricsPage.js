import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
} from '@material-ui/core';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CHART_HEIGHT, CHART_MARGINS } from './constants';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(2),
  },
  table: { minWidth: 450 },
  container: {
    paddingBottom: theme.spacing(3),
  },
  loader: theme.spacing(2),
  divider: {
    margin: theme.spacing(4),
  },
}));

const ReactMetricsPage = () => {
  const classNames = useStyles();
  const [complexityAcrossYears, setComplexityAcrossYears] = useState(null);
  const [openedIssuesAcrossYears, setOpenedIssuesAcrossYears] = useState(null);

  useEffect(() => {
    fetch('/metrics/reactDataset-complexityAcrossYears/')
      .then(response => response.json())
      .then(setComplexityAcrossYears);
  }, []);

  useEffect(() => {
    fetch('/metrics/reactDataset-openedIssuesAcrossYears')
      .then(response => response.json())
      .then(setOpenedIssuesAcrossYears);
  }, []);

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="space-around"
      alignItems="center"
      className={classNames.container}
    >
      <Grid item xs={12} md={12}>
        <Typography color="primary" align="center" component="h4" className={classNames.title}>
          Выберите тип графика для продолжения
        </Typography>
      </Grid>
      <Grid item container xs={12} md={12} direction="row" alignItems="flex-start" justify="space-between">
        <Grid
          item
          container
          xs={12}
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={classNames.viewerWrapper}
        >
          {!complexityAcrossYears && <CircularProgress className={classNames.loader} />}
          {complexityAcrossYears && (
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
              <LineChart data={complexityAcrossYears} margin={CHART_MARGINS}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="complexity" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="complexity / lines" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Grid>
        {complexityAcrossYears && (
          <Grid item container xs={12} md={12} direction="column" justify="flex-start" alignItems="center">
            <Table className={classNames.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Год</TableCell>
                  <TableCell align="right">Сложность</TableCell>
                  <TableCell align="right">Сложность на строку кода</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complexityAcrossYears.map(row => (
                  <TableRow key={row.year}>
                    <TableCell component="th" scope="row">
                      {row.year}
                    </TableCell>
                    <TableCell align="right">{row.complexity}</TableCell>
                    <TableCell align="right">{row['complexity / lines']}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        )}
        <div className={classNames.divider} />
        <Grid item xs={12} md={12}>
          <Typography color="primary" align="center" component="h4" className={classNames.title}>
            Выберите тип графика для продолжения
          </Typography>
        </Grid>
        <Grid item container xs={12} md={12} direction="row" alignItems="flex-start" justify="space-between">
          <Grid
            item
            container
            xs={12}
            direction="column"
            justify="flex-start"
            alignItems="center"
            className={classNames.viewerWrapper}
          >
            {!openedIssuesAcrossYears && <CircularProgress className={classNames.loader} />}
            {openedIssuesAcrossYears && (
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <LineChart data={openedIssuesAcrossYears} margin={CHART_MARGINS}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="opened_issues" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Grid>
          {openedIssuesAcrossYears && (
            <Grid item container xs={12} md={12} direction="column" justify="flex-start" alignItems="center">
              <Table className={classNames.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Год</TableCell>
                    <TableCell align="right">Кол-во открытых Issue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {openedIssuesAcrossYears.map(row => (
                    <TableRow key={row.year}>
                      <TableCell component="th" scope="row">
                        {row.year}
                      </TableCell>
                      <TableCell align="right">{row.opened_issues}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReactMetricsPage;
