import { combineReducers } from 'redux';
import authReducer from './authReducer';
import execReducer from './execReducer';
import errorReducer from './errorReducer';

// Combina toti reducatorii
export default combineReducers({
  auth: authReducer,
  exec: execReducer,
  errors: errorReducer
});