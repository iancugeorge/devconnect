import { GET_ERRORS } from '../actions/types';

// Erorile initiale
const initialState = {};

// Seteaza erorile gasite
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}