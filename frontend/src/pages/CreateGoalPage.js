import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { get, isEqual, set, uniqueId } from 'lodash-es';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { Graph } from '../components';
import { addChartRoute } from '../routes';

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

const generateNewQuestion = () => ({ text: null, metrics: [], id: uniqueId() });

const initialValues = {
  name: null,
  questions: [generateNewQuestion()],
};

const REQUIRED_FIELDS = ['name', 'questions[0].text'];

const REQUIRED_FIELD_MESSAGE = 'Поле обязательно';

const validate = values => {
  const errors = {};

  REQUIRED_FIELDS.forEach(fieldPath => {
    if (!get(values, fieldPath)) {
      set(errors, fieldPath, REQUIRED_FIELD_MESSAGE);
    }
  });

  return errors;
};

const CreateGoalPage = () => {
  const classNames = useStyles();
  const [goal, updateGoal] = useState(initialValues);

  return (
    <Grid container>
      <Grid container item xs={6}>
        <Form
          onSubmit={updateGoal}
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
                <Grid item xs={12} md={6}>
                  <Field
                    name="name"
                    render={props => (
                      <TextField
                        label="Цель"
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
                    onClick={() => push('questions', generateNewQuestion())}
                  >
                    Добавить вопрос
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    type="button"
                    className={classNames.button}
                    onClick={() => pop('questions')}
                    disabled={values.questions.length < 2}
                  >
                    Удалить последний вопрос
                  </Button>
                </Grid>
                <FieldArray
                  name="questions"
                  render={({ fields }) =>
                    fields.map((name, index) => (
                      <Grid item xs={12} key={values.questions[index].id}>
                        <Field
                          name={`${name}.text`}
                          render={props => (
                            <TextField
                              label={`Вопрос ${index + 1}`}
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
                <Button variant="contained" color="secondary" type="submit" className={classNames.button}>
                  Применить
                </Button>
              </Grid>
            </form>
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Graph model={goal} />
      </Grid>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classNames.button}
        disabled={goal === initialValues}
        component={RouterLink}
        to={addChartRoute}
      >
        Подтвердить
      </Button>
    </Grid>
  );
};

export default CreateGoalPage;
