const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  // Obiect care sa contina toate erorile detectate
  let errors = {};

  // Verifaca daca campurile sunt goale, 
  // daca sunt atunci valoarea se schimba in string gol
  // pentru a fi verificat si de Validator
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 4 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  return {
    // Returneaza erorile si isValid daca nu sunt erori
    errors,
    isValid: isEmpty(errors)
  };
};
