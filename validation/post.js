const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  // Obiect care sa contina toate erorile detectate
  let errors = {};

  // Verifaca daca campurile sunt goale, 
  // daca sunt atunci valoarea se schimba in string gol
  // pentru a fi verificat si de Validator
  data.text = !isEmpty(data.text) ? data.text : '';
  data.result = !isEmpty(data.result) ? data.result : '';


  if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
    errors.text = 'Textul problemei trebuie sa fie intre 10 si 1000 de caractere';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Este necesar textul problemei';
  }

  if (Validator.isEmpty(data.result)) {
    errors.result = 'Trebuie sa existe un rezultat';
  }

  return {
    // Returneaza erorile si isValid daca nu sunt erori
    errors,
    isValid: isEmpty(errors)
  };
};
