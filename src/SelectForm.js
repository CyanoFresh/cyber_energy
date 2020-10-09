import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button, CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { API_KEY, API_URL, sheetId } from './config';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0),
  },
}));

export function SelectForm() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  useEffect(() => {
    const load = async () => {
      await fetch(
        `${API_URL}/${sheetId}/values:batchGet?key=${API_KEY}&ranges=725033TY.csv!A3:C&ranges=725033TY.csv!AF3:AF&ranges=725033TY.csv!AR3:AR&ranges=725033TY.csv!AU3:AU`
      );
    };

    load();
  }, []);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className={classes.root}>
        <CardContent>
          <TextField
            required
            name="url"
            label="Sheet URL"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </CardContent>
        <CardActions>
          <Button type="submit">Порахувати</Button>
        </CardActions>
      </Card>
    </form>
  );
}
