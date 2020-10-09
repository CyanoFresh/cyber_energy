import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Button, CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0)
  }
}));

export function SelectForm() {
  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [dateTo, setDateTo] = useState(
    new Date("2014-10-22T21:11:54")
  );

  const handleDateFromChange = date => setDateFrom(date);
  const handleDateToChange = date => setDateTo(date);

  const onSubmit = e => {
    e.preventDefault();
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
                  id="date-from"
                  label="Дата початку"
                  format="MM/dd/yyyy"
                  value={dateFrom}
                  onChange={handleDateFromChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-to"
                  label="Дата кінця"
                  format="MM/dd/yyyy"
                  value={dateTo}
                  onChange={handleDateToChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                  fullWidth
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="primary">Порахувати</Button>
        </CardActions>
      </Card>
    </form>
  );
}
