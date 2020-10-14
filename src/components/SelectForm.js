import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button, CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { API_KEY, API_URL } from '../config';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { buildRangesUrl, getSheetIdFromUrl } from '../utils/functions';
import { parseData } from '../utils/parse';
import { DataContext } from './dataContext';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0),
  },
}));

export function SelectForm() {
  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState(new Date('1980-01-01T00:00:00'));
  const [dateTo, setDateTo] = useState(new Date('1980-01-07T00:00:00'));
  const { setData, loading, setLoading, setError } = useContext(DataContext);

  const onSubmit = async e => {
    e.preventDefault();

    const url = e.target.url.value;
    const sheetId = getSheetIdFromUrl(url);

    if (!sheetId) return setError('Неправильне посилання');

    setLoading(true);
    setError(false);

    try {
      const sheetResponse = await fetch(`${API_URL}/${sheetId}?key=${API_KEY}`);
      const sheetData = await sheetResponse.json();

      if (sheetData.error) {
        return setError('Файл не знайдено');
      }

      const sheet = sheetData.sheets[0].properties.title;

      const dataResponse = await fetch(
        `${API_URL}/${sheetId}/values:batchGet?key=${API_KEY}${buildRangesUrl(
          sheet
        )}`
      );
      const data = await dataResponse.json();

      const t0 = performance.now();
      const parsedData = parseData(data, dateFrom, dateTo);
      const t1 = performance.now();

      console.log('Calculations took ' + (t1 - t0) + ' milliseconds.');

      setData(parsedData);
      setLoading(false);
    } catch (e) {
      setError('Неможливо завантажити дані: ' + e);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Введіть дані:
          </Typography>

          <TextField
            required
            name="url"
            type="url"
            label="Sheet URL"
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  autoOk
                  format="dd.MM"
                  margin="normal"
                  label="Дата початку"
                  inputVariant="outlined"
                  value={dateFrom}
                  onChange={setDateFrom}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  autoOk
                  format="dd.MM"
                  margin="normal"
                  label="Дата кінця"
                  inputVariant="outlined"
                  minDate={dateFrom}
                  value={dateTo}
                  onChange={setDateTo}
                  fullWidth
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>

          <FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Порахувати
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    </form>
  );
}
