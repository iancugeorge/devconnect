import isEmpty from '../validation/is-empty';

import { SET_CURRENT_EXERCISE } from '../actions/types';

const initialState = {
  isRetrived: false,
  exercise: {}
}

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