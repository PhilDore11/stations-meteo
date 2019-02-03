import {
  SUCCESS,
  WARNING,
  ERROR,
} from "./constants";

export const success = (message) => ({
  type: SUCCESS,
  message
});

export const warning = (message) => ({
  type: WARNING,
  message
});

export const error = (message) => ({
  type: ERROR,
  message
});
