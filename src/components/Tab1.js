import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { DataContext } from './dataContext';
import WindRose from './WindRose';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { CardHeader } from '@material-ui/core';

export function Tab1() {
  const { data } = useContext(DataContext);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {data.cityName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Температурні умови
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data.temperatureToDate}>
          <XAxis dataKey="date" />
          <YAxis
            type="number"
            domain={['dataMin - 5', 'dataMax + 5']}
            label={{
              value: 'Температура, °C',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line dataKey="temperature" stroke="#2962ff" dot={false} unit="°C" />
        </LineChart>
      </ResponsiveContainer>
      <Typography variant="h6" gutterBottom>
        Тривалість температурних режимів
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.temperatureToHours}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="temperature"
            label={{
              value: 'Температура, °C',
              offset: 0,
              position: 'insideBottom',
            }}
          />
          <YAxis
            label={{
              value: 'Години',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Bar dataKey="hours" fill="#48D1CC" />
        </BarChart>
      </ResponsiveContainer>
      <Typography variant="h6" gutterBottom>
        Троянда вітрів
      </Typography>
      <Grid container>
        <Grid item md={9} xs={12}>
          <ResponsiveContainer width="100%" height={500}>
            <WindRose data={data.windRose} />
          </ResponsiveContainer>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Змінні вітри
              </Typography>
              {Object.entries(data.windOfChange)
                .slice(0, -2)
                .map(([name, value], index) => (
                  <div key={index}>
                    <strong>{name} m/s:</strong> {value}
                  </div>
                ))}
              <strong>Штиль:</strong>{' '}
              {data.windOfChange.calm +
                ' (' +
                data.windOfChange.calmPercent +
                '%)'}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom>
        Тривалість режимів вітрової активності
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.speedToHours}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="speed"
            label={{
              value: 'Швидкість, м/c',
              offset: 0,
              position: 'insideBottom',
            }}
          />
          <YAxis
            label={{
              value: 'Години',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Bar dataKey="hours" fill="#ec407a" />
        </BarChart>
      </ResponsiveContainer>
      <Typography variant="h6" gutterBottom>
        Інтенсивність сонячної інсоляції
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.solarToDate}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            label={{
              value: 'Сонячна Інсоляція, Вт/м2',
              angle: -90,
              position: 'insideBottomLeft',
            }}
          />
          <Tooltip />
          <Bar dataKey="solar" fill="#00bcd4" />
        </BarChart>
      </ResponsiveContainer>
      <Typography variant="h6" gutterBottom>
        Тривалість режимів сонячної активності
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.wattToHours}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="watt"
            label={{
              value: 'Сонячна Інсоляція, Вт/м2',
              offset: 0,
              position: 'insideBottom',
            }}
          />
          <YAxis
            label={{
              value: 'Години',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Bar dataKey="hours" fill="#c51162" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
