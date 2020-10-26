import { loadRanges } from '../config';

export const getSheetIdFromUrl = url =>
  url.split('/').find((part, index, parts) => parts[index - 1] === 'd');

export const buildRangesUrl = sheet =>
  loadRanges.reduce((str, range) => `${str}&ranges=${sheet}!${range}`, '');
