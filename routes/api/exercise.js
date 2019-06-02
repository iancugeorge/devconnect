const express = require('express');
const router = express.Router();

// Load Validation 
const validateGetExercise = require('../../validation/getexercise');
const validatePostExercise = require('../../validation/post');

// Load exercise model
const Exercise = require("../../models/Exercise");

// @route   POST api/exercise
// @desc    Post an exercise
// @access  Public
router.post("/", (req, res) => {
  const { errors, isValid } = validatePostExercise(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Verifica daca exista deja o problema cu id-ul dat
  Exercise.findOne({ id: req.body.id })
    .then(exercise => {
      if (exercise) {
        errors.id = "Id-ul exista deja"
        return res.status(400).json(errors.id);
      } else {
        // Creaza un exercitiu nou
        const newExercise = new Exercise({
          id: req.body.id,
          text: req.body.text,
          valInit: req.body.valInit,
          valCalc: req.body.valCalc,
          result: req.body.result
        });
        // Salveaza exercitiul
        newExercise
          .save()
          .then(exercise => res.json(exercise))
          .catch(err => console.log(err));
      }
    })
});


// @route   GET api/exercise
// @desc    Get an exercise
// @access  Public
router.get('/:id', (req, res) => {

  const errors = {};

  // Gaseste exercitiul dupa un id
  Exercise.findOne({ id: req.params.id })
    .then(exercise => {
      if (exercise) {
        res.json({
          id: exercise.id,
          text: exercise.text,
          valInit: exercise.valInit,
          valCalc: exercise.valCalc,
          result: exercise.result
        });
      } else {
        errors.id = "Problema nu exista"
        return res.status(404).json(errors);
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;