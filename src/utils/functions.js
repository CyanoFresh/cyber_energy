export const getSheetIdFromUrl = url =>
  url.split('/').find((part, index, parts) => parts[index - 1] === 'd');
