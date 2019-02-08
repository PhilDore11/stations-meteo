import { FETCH_IDF_DATA, FETCH_IDF_DATA_SUCCESS, FETCH_IDF_DATA_ERROR, SET_MONTH } from './constants';

export const fetchIdfData = clientId => ({
  type: FETCH_IDF_DATA,
  clientId,
});

export const fetchIdfDataSuccess = res => ({
  type: FETCH_IDF_DATA_SUCCESS,
  res,
});

export const fetchIdfDataError = error => ({
  type: FETCH_IDF_DATA_ERROR,
  error,
});

export const setMonth = month => ({
  type: SET_MONTH,
  month,
});
