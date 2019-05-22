const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ExerciseSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  tags: [{
    type: String,
    require: true
  }],
  text: {
    type: String,
    require: true
  },
  valInit: [
    {
      name: {
        type: String,
        require: true
      },
      min: {
        type: Number,
        require: true
      },
      max: {
        type: Number,
        require: false
      }
    }
  ],
  valCalc: [
    {
      name: {
        type: String,
        require: true
      },
      val: {
        type: String,
        require: true
      }
    }
  ],
  result: {
    type: String,
    require: true
  }
});

module.exports = Exercise = mongoose.model("exercise", ExerciseSchema);