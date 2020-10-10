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

const data1 = [
  { temperature: 0, date: new Date().toLocaleTimeString() },
  { temperature: -1, date: new Date().toLocaleTimeString() },
  { temperature: -20, date: new Date().toLocaleTimeString() },
  { temperature: 15, date: new Date().toLocaleTimeString() },
];

const data2 = [
  { temperature: 0, time: 100 },
  { temperature: 1, time: 200 },
  { temperature: 2, time: 300 },
  { temperature: 3, time: 400 },
  { temperature: 4, time: 500 },
];

const data3 = [
  { direction: 'N', time: 60 },
  { direction: 'NE', time: 20 },
  { direction: 'E', time: 30 },
  { direction: 'SE', time: 15 },
  { direction: 'S', time: 30 },
  { direction: 'SW', time: 60 },
  { direction: 'W', time: 130 },
  { direction: 'NW', time: 100 },
];
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

export function Tab1() {
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data1}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={600}
          height={300}
          data={data2}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="temperature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={500}>
        <RadarChart
          cx={300}
          cy={250}
          outerRadius={150}
          width={600}
          height={500}
          data={data3}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="direction" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="time"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={600}
          height={300}
          data={data4}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="temperature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={600}
          height={300}
          data={data5}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="temperature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={600}
          height={300}
          data={data6}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
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
