const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  // Obiect care sa contina toate erorile detectate
  let errors = {};

  // Verifaca daca campurile sunt goale, 
  // daca sunt atunci valoarea se schimba in string gol
  // pentru a fi verificat si de Validator  
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Numele trebuie sa fie intre 2 si 30 de caractere';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Este necesar un nume';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Este necesar un email';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Emailul este invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Parola este necesara';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Parola trebuie sa aiba cel putin 6 caractere';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Este necesara confirmarea parolei';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Parolele nu sunt identice';
  }

  return {
    // Returneaza erorile si isValid daca nu sunt erori
    errors,
    isValid: isEmpty(errors)
  };
};
