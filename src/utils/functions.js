import { loadRanges } from '../config';

export const getSheetIdFromUrl = url =>
  url.split('/').find((part, index, parts) => parts[index - 1] === 'd');

export const buildRangesUrl = sheet =>
  loadRanges.reduce((str, range) => `${str}&ranges=${sheet}!${range}`, '');

export const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export const getDirection = degree =>
  directions[Math.round((degree % 360) / 45) % 8];
