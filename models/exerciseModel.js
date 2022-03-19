const mongoose = require('mongoose')

const ExerciseSchema = mongoose.Schema({
  userId: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date
})

const Exercise = mongoose.model('Exercise', ExerciseSchema)

module.exports = Exercise;