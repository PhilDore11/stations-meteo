import { 
  FETCH_CLIENTS,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENTS_ERROR,
} from './constants';

export const fetchClients = (currentDay) => ({
  type: FETCH_CLIENTS,
  currentDay,
});

export const fetchClientsSuccess = (res) => ({
  type: FETCH_CLIENTS_SUCCESS,
  res,
});

export const fetchClientsError = (error) => ({
  type: FETCH_CLIENTS_ERROR,
  error,
});
