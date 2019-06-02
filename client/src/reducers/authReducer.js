import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER } from '../actions/types';

// Starea profilului initiala
const initialState = {
  isAuthenticated: false,
  user: {}
}

// La actiunea SET_CURRENT_PROFILE modifaca starea cu profilul revendicat
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}