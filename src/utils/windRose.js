export const directions = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
];

export const getDirection = degree =>
  directions[Math.round((degree % 360) / 22.5) % 16];

/**
 * @param {{}} count
 * @param {Number} speed
 */
export const countPush = (count, speed) => {
  if (speed < 1) {
    count['0-1']++;
  } else if (speed < 2) {
    count['1-2']++;
  } else if (speed < 3) {
    count['2-3']++;
  } else if (speed < 4) {
    count['3-4']++;
  } else if (speed < 5) {
    count['5-6']++;
  } else if (speed < 6) {
    count['6-7']++;
  } else {
    count['7+']++;
  }
};

export const calculateWindRose = data => {
  const angleSpeedsCount = {
    N: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    NNE: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    NE: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    ENE: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    E: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    ESE: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    SE: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    SSE: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    S: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    SSW: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    SW: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    WSW: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    W: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    WNW: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    NW: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
    NNW: {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '7+': 0,
    },
  };

  data.direction.forEach((direction, index) => {
    const speed = data.speed[index];
    const dir = getDirection(direction);
    return countPush(angleSpeedsCount[dir], speed);
  });

  return Object.keys(angleSpeedsCount).map(angle => {
    let total = 0;

    Object.keys(angleSpeedsCount[angle]).forEach(speedInterval => {
      total += angleSpeedsCount[angle][speedInterval];
    });

    return {
      angle,
      ...angleSpeedsCount[angle],
      total,
    };
  });
};
