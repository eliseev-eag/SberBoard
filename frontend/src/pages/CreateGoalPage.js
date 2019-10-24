import React from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { get, isEqual, set, uniqueId } from 'lodash-es';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';

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

const initialValues = {
  goal: null,
  questions: [],
};

const generateNewQuestion = () => ({ title: null, id: uniqueId() });

const CreateGoalPage = () => {
  const classNames = useStyles();

  const onSubmit = console.warn;

  return (
    <Grid container item xs={12}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        initialValuesEqual={isEqual}
        // validate={validate}
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
                  name="goal"
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
              {/* <Grid item xs={12} md={6}>
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
              </Grid> */}
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
                        name={`${name}.title`}
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
              <Button variant="contained" color="primary" type="submit" className={classNames.button}>
                Применить
              </Button>
            </Grid>
          </form>
        )}
      />
    </Grid>
  );
};

export default CreateGoalPage;
