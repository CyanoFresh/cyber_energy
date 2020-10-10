import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import React from 'react';

const data4 = [
  { temperature: 0, time: 100 },
  { temperature: 1, time: 200 },
  { temperature: 2, time: 300 },
  { temperature: 3, time: 400 },
  { temperature: 4, time: 500 },
];

const data5 = [
  { temperature: 0, time: 100 },
  { temperature: 1, time: 200 },
  { temperature: 2, time: 300 },
  { temperature: 3, time: 400 },
  { temperature: 4, time: 500 },
];

const data6 = [
  { temperature: 0, time: 100 },
  { temperature: 1, time: 200 },
  { temperature: 2, time: 300 },
  { temperature: 3, time: 400 },
  { temperature: 4, time: 500 },
];

export function Tab1({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data.temperatureToDate}>
          <XAxis dataKey="date" />
          <YAxis type="number" domain={['dataMin - 5', 'dataMax + 5']} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line dataKey="temperature" stroke="#82ca9d" dot={false} />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.temperatureToHours}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="temperature" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hours" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data.directionToHours || []}>
          <PolarGrid />
          <PolarAngleAxis dataKey="direction" />
          <PolarRadiusAxis />
          <Radar
            dataKey="hours"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data4}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="temperature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data5}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="temperature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data6}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="temperature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
