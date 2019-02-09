import { SET_YEAR, SET_MONTH } from '../constants';

export const setYear = year => ({
  type: SET_YEAR,
  year,
});

export const setMonth = month => ({
  type: SET_MONTH,
  month,
});
