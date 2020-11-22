import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useContext } from 'react';
import { Tab2Context } from './Tab2Context';

export const ResultField = ({ title, name, unit, TextFieldProps = {} }) => {
  const { result } = useContext(Tab2Context);

  if (unit) {
    TextFieldProps.InputProps = {
      ...TextFieldProps.InputProps,
      endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
    };
  }

  if (!result[name]) {
    return null;
  }

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item md={4} xs={12}>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          readOnly
          variant="outlined"
          fullWidth
          value={result[name]}
          {...TextFieldProps}
        />
      </Grid>
    </Grid>
  );
};
