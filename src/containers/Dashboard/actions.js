import { INCREMENT, DECREMENT, SET_VIEW } from '../constants';

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const setView = view => ({
  type: SET_VIEW,
  view,
});
