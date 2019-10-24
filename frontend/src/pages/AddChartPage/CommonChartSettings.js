import React from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { get, isEqual, set, uniqueId } from 'lodash-es';
import { Button, Grid, FormControl, FormLabel, makeStyles, RadioGroup, Radio, TextField } from '@material-ui/core';
import { InsertChart, PieChart, ShowChart } from '@material-ui/icons';
import { ChartTypesEnum, INITIAL_MEASURE, REQUIRED_FIELD_MESSAGE, REQUIRED_FIELDS } from './constants';

const useStyles = makeStyles(theme => ({
  button: { margin: theme.spacing(1) },
  chartTypeButton: {
    display: 'flex',
    margin: theme.spacing(1),
    fontSize: 26,
  },
  form: {
    width: '100%',
    padding: theme.spacing(2),
  },
}));

const generateNewMeasures = () => ({ ...INITIAL_MEASURE, id: uniqueId() });

const CHART_TYPE_OPTIONS = [
  { value: ChartTypesEnum.pie, icon: <PieChart /> },
  { value: ChartTypesEnum.linear, icon: <ShowChart /> },
  { value: ChartTypesEnum.bar, icon: <InsertChart /> },
];

const validate = values => {
  const errors = {};

  REQUIRED_FIELDS.forEach(fieldPath => {
    if (!get(values, fieldPath)) {
      set(errors, fieldPath, REQUIRED_FIELD_MESSAGE);
    }
  });

  return errors;
};

const CommonChartSettings = ({ onSubmit, initialValues }) => {
  const classNames = useStyles();
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      initialValuesEqual={isEqual}
      validate={validate}
      mutators={{
        ...arrayMutators,
      }}
      render={({
        handleSubmit,
        form: {
          mutators: { push, pop },
        },
        values,
      }) => (
        <form onSubmit={handleSubmit} className={classNames.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                name="chartType"
                type="radio"
                render={props => (
                  <FormControl
                    component="fieldset"
                    className={classNames.formControl}
                    {...props.input}
                    error={Boolean(props.meta.touched && props.meta.error)}
                    required
                  >
                    <FormLabel component="legend">Тип графика</FormLabel>
                    <RadioGroup aria-label="gender" {...props.input} row>
                      {CHART_TYPE_OPTIONS.map(it => (
                        <Radio
                          key={it.value}
                          value={it.value}
                          checkedIcon={it.icon}
                          icon={it.icon}
                          className={classNames.chartTypeButton}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="xAxis"
                render={props => (
                  <TextField
                    label="Ось X"
                    error={Boolean(props.meta.touched && props.meta.error)}
                    variant="outlined"
                    required
                    fullWidth
                    {...props.input}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="yAxis"
                render={props => (
                  <TextField
                    label="Ось Y"
                    error={Boolean(props.meta.touched && props.meta.error)}
                    variant="outlined"
                    required
                    fullWidth
                    {...props.input}
                  />
                )}
              />
            </Grid>
            <Grid item container xs={12} direction="row" justify="flex-start" alignItems="center">
              <Button
                variant="contained"
                color="default"
                type="button"
                className={classNames.button}
                onClick={() => push('measures', generateNewMeasures())}
              >
                Добавить измерение
              </Button>
              <Button
                variant="contained"
                color="default"
                type="button"
                className={classNames.button}
                onClick={() => pop('measures')}
                disabled={values.measures.length < 2}
              >
                Удалить последнее измерение
              </Button>
            </Grid>
            <FieldArray
              name="measures"
              render={({ fields }) =>
                fields.map((name, index) => (
                  <Grid item xs={12} key={values.measures[index].id}>
                    <Field
                      name={`${name}.dataField`}
                      render={props => (
                        <TextField
                          label={`Поле ${index + 1}`}
                          error={Boolean(props.meta.touched && props.meta.error)}
                          variant="outlined"
                          required={index === 0}
                          fullWidth
                          {...props.input}
                        />
                      )}
                    />
                  </Grid>
                ))
              }
            />
            <Button variant="contained" color="primary" type="submit" className={classNames.button}>
              Применить
            </Button>
          </Grid>
        </form>
      )}
    />
  );
};

export default CommonChartSettings;
