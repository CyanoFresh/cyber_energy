export const API_URL = 'https://sheets.googleapis.com/v4/spreadsheets';
export const API_KEY = 'AIzaSyBIGs6RRL6WtWnCZpOZwjIHaSdO8vfVyBk';

export const loadRanges = [
  'A3:B',
  'E3:E',
  'AF3:AF',
  'AR3:AR',
  'AU3:AU',
  'B1:B1',
];

export const columnIndexes = {
  date: 0,
  time: 1,
  solar: 2,
  temperature: 3,
  windDirection: 4,
  windSpeed: 5,
  cityName: 5,
};

export const cityLinks = [
  {
    value:
      'https://docs.google.com/spreadsheets/d/1qcC9ww0yufzxoGVCGE41XsIQ8N3oEw4ZG7lzrALzh0Q/edit#gid=1169870032',
    label: 'New York',
  },
  {
    value:
      'https://docs.google.com/spreadsheets/d/1OKsZdcYz8Joe60L5Rkid31jdzVDg9oyF6CxTO1ADOGs/edit#gid=1409575944',
    label: 'Palm Springs',
  },
  {
    value:
      'https://docs.google.com/spreadsheets/d/1E7SMdsmd6-bR3bI0CAdc5L_QMrNPEK3JIW5XTQJ0TPM/edit#gid=811480449',
    label: 'Selawik',
  },
  {
    value:
      'https://docs.google.com/spreadsheets/d/1zfhNz2immYrnEjd-7yC-6KK7YpK7oWaAVgibv9C0GiQ/edit#gid=1233604839',
    label: 'Lihue Airport',
  },
];
