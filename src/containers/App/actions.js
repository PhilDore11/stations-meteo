import {
  SUCCESS,
  WARNING,
  ERROR,
  RESET_ALERTS,
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

export const resetAlerts = () => ({
  type: RESET_ALERTS,
})