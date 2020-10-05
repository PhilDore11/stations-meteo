import {
  LOGOUT,
  FETCH_COEFFICIENTS,
  FETCH_COEFFICIENTS_SUCCESS,
  FETCH_COEFFICIENTS_ERROR,
} from '../constants';

const initialState = {
  data: [],
  error: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...initialState,
      };
    case FETCH_COEFFICIENTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COEFFICIENTS_SUCCESS:
      return {
        ...state,
        data: action.res,
        error: false,
        loading: false,
      };
    case FETCH_COEFFICIENTS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
