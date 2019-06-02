const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateGetExercise(data) {
  // Obiect care sa contina toate erorile detectate
  let errors = {};

  // Verifaca daca id-ul este gol
  data.id = !isEmpty(data.id) ? data.id : '';

  return {
    // Returneaza erorile si isValid daca nu sunt erori
    errors,
    isValid: isEmpty(errors)
  };
};
