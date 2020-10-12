import React, { useState, useEffect, useContext } from 'react';
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
import { getSheetIdFromUrl } from '../utils/functions';
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
  const [dateFrom, setDateFrom] = useState(new Date('2014-01-01T21:11:54'));
  const [dateTo, setDateTo] = useState(new Date('2014-01-01T21:11:54'));
  const [url, setUrl] = useState('');
  const { setData, loading, setLoading, setError } = useContext(DataContext);

  useEffect(() => {
    const load = async sheetId => {
      setLoading(true);
      setError(false);

      try {
        const sheetResponse = await fetch(
          `${API_URL}/${sheetId}?key=${API_KEY}`
        );
        const sheetData = await sheetResponse.json();
        const sheet = sheetData.sheets[0].properties.title;

        const dataResponse = await fetch(
          `${API_URL}/${sheetId}/values:batchGet?key=${API_KEY}&ranges=${sheet}!A3:B&ranges=${sheet}!E3:E&ranges=${sheet}!AF3:AF&ranges=${sheet}!AR3:AR&ranges=${sheet}!AU3:AU`
        );
        const data = await dataResponse.json();
        const parsedData = parseData(data, dateFrom, dateTo);

        setData(parsedData);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    const sheetId = getSheetIdFromUrl(url);

    if (sheetId) {
      load(sheetId);
    }
  }, [dateFrom, dateTo, setData, setLoading, setError, url]);

  const handleDateFromChange = date => setDateFrom(date);
  const handleDateToChange = date => setDateTo(date);

  const onSubmit = e => {
    e.preventDefault();
    setUrl(e.target.url.value);
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
          <Grid container spacing={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  margin="normal"
                  views={['month', 'date']}
                  id="date-from"
                  label="Дата початку"
                  inputVariant="outlined"
                  format="MM.dd"
                  value={dateFrom}
                  onChange={handleDateFromChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-to"
                  label="Дата кінця"
                  format="MM.dd"
                  inputVariant="outlined"
                  value={dateTo}
                  onChange={handleDateToChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  fullWidth
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

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
