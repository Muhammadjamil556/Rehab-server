const express = require("express");
const {
  GetAllExerciseData,
  GetExerciseDataById,
} = require("../../controllers/exercise-controller");
const ExerciseRoute = express.Router();

// exercise
ExerciseRoute.get("/all-exercise", GetAllExerciseData);
ExerciseRoute.get("/all-exercise/:id", GetExerciseDataById);

module.exports = { ExerciseRoute };
