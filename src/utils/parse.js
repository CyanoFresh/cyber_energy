import { columnResponseIndexes } from '../config';
import { directions, getDirection } from './functions';

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
  const temperatureToDate = [],
    solarToDate = [];

  const tmpHours = {};
  const speedHours = {};
  const wattHours = {};
  const directionHours = directions.reduce(
    (acc, direction) => ({
      ...acc,
      [direction]: 0,
    }),
    {}
  );

  data.forEach(row => {
    const temperature = +row[columnResponseIndexes.temperature];
    const date =
      row[columnResponseIndexes.date] + ' ' + row[columnResponseIndexes.time];

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

    const direction = getDirection(+row[columnResponseIndexes.windDirection]);
    directionHours[direction]++;

    const speed = Math.round(+row[columnResponseIndexes.windSpeed]);

    if (speedHours.hasOwnProperty(speed)) {
      speedHours[speed]++;
    } else {
      speedHours[speed] = 1;
    }

    const solar = +row[columnResponseIndexes.solar];

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

  return {
    temperatureToDate,
    solarToDate,
    temperatureToHours: hoursToArray(tmpHours, true, 'temperature'),
    directionToHours: hoursToArray(directionHours, false, 'direction'),
    speedToHours: hoursToArray(speedHours, true, 'speed'),
    wattToHours: hoursToArray(wattHours, true, 'watt'),
  };
}

export const parseData = (data, dateFrom, dateTo) =>
  mapData(flattenData(filterData(data, dateFrom, dateTo)));
