const express = require('express');
const router = express.Router();

// Load exercise model
const Exercise = require("../../models/Exercise");

// @route   POST api/exercise
// @desc    Post an exercise
// @access  Public
router.post("/", (req, res) => {
  Exercise.findOne({ id: req.body.id }).then(exercise => {
    if (exercise) {
      return res.status(400).json({ error: "Id already exists" });
    } else {
      const newExercise = new Exercise({
        id: req.body.id,
        text: req.body.text,
        valInit: req.body.valInit,
        valCalc: req.body.valCalc,
        result: req.body.result
      });
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
router.get('/', (req, res) => {
  Exercise.findOne({ id: req.body.id })
    .then(exercise => {
      if (exercise) {
        res.json({
          id: exercise.id,
          text: exercise.text,
          valInit: exercise.valInit,
          valCalc: exercise.valCalc,
          response: exercise.response
        });
      } else {
        return res.status(404).json({ error: 'Exercitiu inexistent' });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;