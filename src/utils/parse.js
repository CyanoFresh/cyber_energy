import { columnResponseIndexes } from '../config';
import { directions, getDirection } from './functions';

/**
 *
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

    // debugger;
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

function mapData(data) {
  const result = {
    temperatureToDate: [],
    temperatureToHours: [],
    directionToHours: [],
    speedToHours: [],
    solarToDate: [],
    wattToHours: [],
  };

  const tmpHours = {};
  const speedHours = {};
  const wattHours = {};
  const directionHours = Object.keys(directions).reduce(
    (acc, direction) => ({
      ...acc,
      [direction]: 0,
    }),
    {}
  );

  data.forEach(row => {
    const temperature = +row[columnResponseIndexes.temperature];

    result.temperatureToDate.push({
      date:
        row[columnResponseIndexes.date] + ' ' + row[columnResponseIndexes.time],
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

    result.solarToDate.push({
      date:
        row[columnResponseIndexes.date] + ' ' + row[columnResponseIndexes.time],
      solar,
    });

    if (solar !== 0) {
      if (wattHours.hasOwnProperty(solar)) {
        wattHours[solar]++;
      } else {
        wattHours[solar] = 1;
      }
    }
  });

  for (const [temperature, hours] of Object.entries(tmpHours).sort(
    (a, b) => a[0] - b[0]
  )) {
    result.temperatureToHours.push({
      temperature,
      hours,
    });
  }

  for (const [direction, hours] of Object.entries(directionHours)) {
    result.directionToHours.push({
      direction,
      hours,
    });
  }

  for (const [speed, hours] of Object.entries(speedHours).sort(
    (a, b) => a[0] - b[0]
  )) {
    result.speedToHours.push({
      speed,
      hours,
    });
  }

  for (const [watt, hours] of Object.entries(wattHours).sort(
    (a, b) => a[0] - b[0]
  )) {
    result.wattToHours.push({
      watt,
      hours,
    });
  }

  return result;
}

export const parseData = (data, dateFrom, dateTo) => {
  const data1 = filterData(data, dateFrom, dateTo);
  const data2 = flattenData(data1);

  return mapData(data2);
};
