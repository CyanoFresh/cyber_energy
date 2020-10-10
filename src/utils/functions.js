export const getSheetIdFromUrl = url =>
  url.split('/').find((part, index, parts) => parts[index - 1] === 'd');

export const directions = {
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
  const directionNames = Object.keys(directions);
  const index = Math.round((degree % 360) / 45) % 8;

  return directionNames[index];
};
