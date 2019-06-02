const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  // Obiect care sa contina toate erorile detectate
  let errors = {};

  // Verifaca daca campurile sunt goale, 
  // daca sunt atunci valoarea se schimba in string gol
  // pentru a fi verificat si de Validator
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Emailul este invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Este necesara adresa de email';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Este necesara parola';
  }

  return {
    // Returneaza erorile si isValid daca nu sunt erori
    errors,
    isValid: isEmpty(errors)
  };
};
