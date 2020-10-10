export const getSheetIdFromUrl = url =>
  url.split('/').find((part, index, parts) => parts[index - 1] === 'd');

const directions = {
  N: 0,
  NE: 45,
  E: 90,
  SE: 135,
  S: 180,
  SW: 225,
  W: 270,
  NW: 315,
};

export const getDirection = degree => {
  degree %= 360;

  for (let [direction, directionDegree] of Object.entries(directions)) {
    if (directionDegree < 22.5) {
      directionDegree += 22.5;
    }
    if (degree >= directionDegree - 22.5 && degree < directionDegree + 22.5) {
      return direction;
    }
  }
};
