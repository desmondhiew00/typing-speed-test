// state in local storage

const initialState = {
  themeColor: 'green',
  timerDuration: 60,
  records: []
};

const themeColors = {
  green: {
    100: '#44d62c',
    200: '#63db4b',
    300: '#7ce064',
    400: '#92e57b',
    500: '#a6ea91',
    600: '#b9efa7'
  },
  purple: {
    100: '#382bf0',
    200: '#5e43f3',
    300: '#7a5af5',
    400: '#9171f8',
    500: '#a688fa',
    600: '#ba9ffb'
  },
  cyan: {
    100: '#03a9f4',
    200: '#4ab2f5',
    300: '#6abcf7',
    400: '#84c5f8',
    500: '#9bcefa',
    600: '#b1d8fb'
  },
  red: {
    100: '#e91e63',
    200: '#ef4873',
    300: '#f46583',
    400: '#f97d93',
    500: '#fd94a4',
    600: '#ffaab6'
  }
};

const initStore = () => {
  const themeColor = localStorage.getItem('themeColor');
  if (!themeColor) {
    localStorage.setItem('themeColor', initialState.themeColor);
  }

  const timerDuration = localStorage.getItem('timerDuration');
  if (!timerDuration) {
    localStorage.setItem('timerDuration', initialState.timerDuration);
  }
};

// keys of themeColors
const setThemeColor = (colorKey, save = true) => {
  if (save) localStorage.setItem('themeColor', colorKey);

  const root = document.documentElement;
  const color = themeColors[colorKey];
  if (color) {
    root.style.setProperty('--color-primary-100', color[100]);
    root.style.setProperty('--color-primary-200', color[200]);
    root.style.setProperty('--color-primary-300', color[300]);
    root.style.setProperty('--color-primary-400', color[400]);
    root.style.setProperty('--color-primary-500', color[500]);
    root.style.setProperty('--color-primary-600', color[600]);
  }
};

const getThemeColor = () => {
  const colorKey = localStorage.getItem('themeColor');
  if (colorKey) return colorKey;
  localStorage.setItem('themeColor', initialState.themeColor);
  return initialState.themeColor;
};

const getRecords = () => {
  const records = localStorage.getItem('records');
  if (records) return JSON.parse(records);
  localStorage.setItem('records', JSON.stringify(initialState.records));
  return initialState.records;
};

const addRecord = (record) => {
  const records = getRecords();
  records.push(record);
  localStorage.setItem('records', JSON.stringify(records));
};

const clearRecords = () => {
  localStorage.setItem('records', JSON.stringify([]));
};

$(() => {
  initStore();
  setThemeColor(getThemeColor(), false);
});
