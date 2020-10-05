import {
  FETCH_COEFFICIENTS,
  FETCH_COEFFICIENTS_SUCCESS,
  FETCH_COEFFICIENTS_ERROR,
} from "./constants";

export const fetchCoefficients = (stationId, start, end) => ({
  type: FETCH_COEFFICIENTS,
  stationId,
  start,
  end,
});

export const fetchCoefficientsSuccess = (res) => ({
  type: FETCH_COEFFICIENTS_SUCCESS,
  res,
});

export const fetchCoefficientsError = (error) => ({
  type: FETCH_COEFFICIENTS_ERROR,
  error,
});
