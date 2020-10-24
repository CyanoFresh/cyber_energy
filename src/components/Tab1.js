import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
          <YAxis type="number" domain={['dataMin - 5', 'dataMax + 5']} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line dataKey="temperature" stroke="#2962ff" dot={false} unit="°C" />
        </LineChart>
      </ResponsiveContainer>

      <Typography variant="h6" gutterBottom>
        Тривалість температурних режимів
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.temperatureToHours}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="temperature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#48D1CC" />
        </BarChart>
      </ResponsiveContainer>

      <Typography variant="h6" gutterBottom>
        Троянда вітрів
      </Typography>
      <ResponsiveContainer width="100%" height={500}>
        <WindRose data={data.windRose} />
      </ResponsiveContainer>
      <strong>Штиль:</strong>{' '}
      {data.windStats.calm + ' (' + data.windStats.calmPercent + ')%'}
      <Typography variant="h6" gutterBottom>
        Тривалість режимів вітрової активності
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.speedToHours}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="speed" />
          <YAxis />
          <Tooltip />
          <Legend />
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
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="solar" fill="#00bcd4" />
        </BarChart>
      </ResponsiveContainer>

      <Typography variant="h6" gutterBottom>
        Тривалість режимів сонячної активності
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.wattToHours}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="watt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#c51162" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
