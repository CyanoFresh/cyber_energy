import { columnIndexes } from '../config';
import { calculateWindRose } from './windRose';

/**
 * @param {{}} data
 * @param {Date} dateFrom
 * @param {Date} dateTo
 * @return {{}}
 */
function filterData(data, dateFrom, dateTo) {
  const matchedIndexes = [];

  data.valueRanges[0].values.forEach((row, rowIndex) => {
    const date = row[0];
    const parts = date.split('/');
    const month = +parts[0] - 1;
    const day = +parts[1];

    const inRange =
      month >= dateFrom.getMonth() &&
      month <= dateTo.getMonth() &&
      day >= dateFrom.getDate() &&
      day <= dateTo.getDate();

    if (inRange) {
      matchedIndexes.push(rowIndex);
    }
  });

  for (let i = 0; i < data.valueRanges.length; i++) {
    data.valueRanges[i].values = data.valueRanges[i].values.filter((_, i) =>
      matchedIndexes.includes(i)
    );
  }

  return data;
}

/**
 * [
 *    [ 'date', ... ],
 *    ...
 * ]
 * [
 *    [ 'wind' ],
 *    ...
 * ]
 * [
 *    [ 'temp' ],
 *    ...
 * ]
 *
 * should be:
 *
 * [
 *    [ 'date', 'wind', 'temp', ... ],
 *    ...
 * ]
 */
function flattenData(data) {
  const result = data.valueRanges[0].values;

  for (let i = 1; i < data.valueRanges.length; i++) {
    for (let j = 0; j < data.valueRanges[i].values.length; j++) {
      const row = data.valueRanges[i].values[j];

      result[j] = [...result[j], ...row];
    }
  }

  return result;
}

const hoursToArray = (obj, sort = false, name) => {
  let entries = Object.entries(obj);

  if (sort) {
    entries = entries.sort((a, b) => a[0] - b[0]);
  }

  return entries.map(([key, value]) => ({
    [name]: key,
    hours: value,
  }));
};

function mapData(data) {
  const temperatureToDate = [];
  const solarToDate = [];
  const windRose = {
    direction: [],
    speed: [],
  };
  const windStats = {
    calm: 0,
    calmPercent: 100,
  };

  const tmpHours = {};
  const speedHours = {};
  const wattHours = {};

  data.forEach(row => {
    const temperature = +row[columnIndexes.temperature];
    const date = row[columnIndexes.date] + ' ' + row[columnIndexes.time];

    temperatureToDate.push({
      date,
      temperature,
    });

    const temperatureInt = Math.round(temperature);

    if (tmpHours.hasOwnProperty(temperatureInt)) {
      tmpHours[temperatureInt]++;
    } else {
      tmpHours[temperatureInt] = 1;
    }

    const speed = Math.round(row[columnIndexes.windSpeed]);

    windRose.direction.push(+row[columnIndexes.windDirection]);
    windRose.speed.push(speed);

    if (speed === 0) {
      windStats.calm++;
    }

    if (speedHours.hasOwnProperty(speed)) {
      speedHours[speed]++;
    } else {
      speedHours[speed] = 1;
    }

    const solar = +row[columnIndexes.solar];

    if (solar !== 0) {
      solarToDate.push({
        date,
        solar,
      });

      if (wattHours.hasOwnProperty(solar)) {
        wattHours[solar]++;
      } else {
        wattHours[solar] = 1;
      }
    }
  });

  windStats.calmPercent = Math.round((windStats.calm / data.length) * 100);

  return {
    temperatureToDate,
    solarToDate,
    windStats,
    windRose: calculateWindRose(windRose),
    temperatureToHours: hoursToArray(tmpHours, true, 'temperature'),
    speedToHours: hoursToArray(speedHours, true, 'speed'),
    wattToHours: hoursToArray(wattHours, true, 'watt'),
  };
}

export const parseData = (data, dateFrom, dateTo) => {
  const result = mapData(flattenData(filterData(data, dateFrom, dateTo)));

  result.cityName = data.valueRanges[columnIndexes.cityName].values[0];

  return result;
};
