import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { DataContext } from './dataContext';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

export function Tab2() {
  const { data } = useContext(DataContext);
  const [values, setValues] = React.useState({
    q: 250,
    S: 300,
    n: 2,
    tInputWater: 15,
    tTargetB: 85,
    tShower: 40,
    countShower: 2,
    tBath: 50,
    countBath: 2,
    calcVariant: '1',
    tankHeatTime: 20,
    tankPower: 2,
    tInsideHouse: 20,
  });
  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {data.cityName}
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Питомі тепловтрати будівлі</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            name="q"
            variant="outlined"
            fullWidth
            value={values.q}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Вт/м²</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Опалювальна площа будинку</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            name="S"
            variant="outlined"
            fullWidth
            value={values.S}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">м²</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Кількість людей</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            name="n"
            variant="outlined"
            fullWidth
            value={values.n}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Температура вхідної води</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            name="tInputWater"
            variant="outlined"
            fullWidth
            value={values.tInputWater}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Кінцева температура бака</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            name="tTargetB"
            variant="outlined"
            fullWidth
            value={values.tTargetB}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Температура води при прийомі душу</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            name="tShower"
            variant="outlined"
            fullWidth
            value={values.tShower}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Кількість прийомів душу</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            name="countShower"
            variant="outlined"
            fullWidth
            value={values.countShower}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Температура води при прийомі ванни</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            name="tBath"
            variant="outlined"
            fullWidth
            value={values.tBath}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Кількість прийомів душу</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            name="countBath"
            variant="outlined"
            fullWidth
            value={values.countBath}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Варіант розрахунку</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            select
            variant="outlined"
            fullWidth
            name="calcVariant"
            value={values.calcVariant}
            onChange={handleChange}
          >
            <MenuItem value="1">розраховуємо потужність нагрівача</MenuItem>
            <MenuItem value="2">
              розраховуємо тривалість нагріву ємності
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
      {values.calcVariant === '1' && (
        <Grid container spacing={2} alignItems="center">
          <Grid item md={4} xs={12}>
            <Typography>Час нагрівання бака ГВП</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              name="tankHeatTime"
              variant="outlined"
              fullWidth
              value={values.tankHeatTime}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">хв</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      )}
      {values.calcVariant === '2' && (
        <Grid container spacing={2} alignItems="center">
          <Grid item md={4} xs={12}>
            <Typography>Теплова потужність нагрівача</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              name="tankPower"
              variant="outlined"
              fullWidth
              value={values.tankPower}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">кВт</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2} alignItems="center">
        <Grid item md={4} xs={12}>
          <Typography>Температуру повітря всередині будівлі</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            required
            name="tInsideHouse"
            variant="outlined"
            fullWidth
            value={values.tInsideHouse}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
