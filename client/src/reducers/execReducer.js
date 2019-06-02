import isEmpty from '../validation/is-empty';

import { SET_CURRENT_EXERCISE } from '../actions/types';

// Starea initiala a exercitilor
const initialState = {
  isRetrived: false,
  exercise: {}
}

// Modifica starea la actionarea SET_CURRENT_EXERCISE
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_EXERCISE:
      return {
        ...state,
        isRetrived: !isEmpty(action.payload),
        exercise: action.payload
      };
    default:
      return state;
  }
}