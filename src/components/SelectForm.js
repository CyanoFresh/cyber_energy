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
import { API_KEY, API_URL, cityLinks } from '../config';
import Grid from '@material-ui/core/Grid';
import { buildRangesUrl, getSheetIdFromUrl } from '../utils/functions';
import { parseData } from '../utils/parse';
import { DataContext } from './dataContext';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0),
  },
}));

export function SelectForm() {
  const classes = useStyles();
  const [url, setUrl] = useState('');
  const [dateFrom, setDateFrom] = useState(new Date('1980-01-01T00:00:00'));
  const [dateTo, setDateTo] = useState(new Date('1980-01-07T00:00:00'));
  const { setData, loading, setLoading, setError } = useContext(DataContext);

  const handleChange = event => setUrl(event.target.value);

  const onSubmit = async e => {
    e.preventDefault();

    const sheetId = getSheetIdFromUrl(e.target.url.value);

    if (!sheetId) {
      return setError('Неправильне посилання');
    }

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

      console.log('Calculations took ' + (t1 - t0) + ' ms');

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
        <CardHeader title="Введіть дані" />

        <CardContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  required
                  name="url"
                  type="url"
                  label="Sheet URL"
                  variant="outlined"
                  fullWidth
                  value={url}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Оберіть місто"
                  defaultValue=""
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                >
                  {cityLinks.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <KeyboardDatePicker
                  autoOk
                  format="dd.MM"
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
                  label="Дата кінця"
                  inputVariant="outlined"
                  minDate={dateFrom}
                  value={dateTo}
                  onChange={setDateTo}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Порахувати
                </Button>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </CardContent>
      </Card>
    </form>
  );
}
