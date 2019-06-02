import axios from 'axios';

import { GET_ERRORS, SET_CURRENT_EXERCISE } from './types';

export const postExercise = exerciseData => dispatch => {
  axios
    .post('/api/exercise/', exerciseData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Exercise by id
export const getExercise = exerciseId => dispatch => {
  axios
    .get(`/api/exercise/${exerciseId}`)
    .then(res => {
      dispatch({
        type: SET_CURRENT_EXERCISE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set current exercise
export const setCurrentExercise = decoded => {
  return {
    type: SET_CURRENT_EXERCISE,
    payload: decoded
  }
}