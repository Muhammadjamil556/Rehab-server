const express = require("express");
const { GetAllExerciseData, GetExerciseDataById, saveExercises } = require("../../controllers/exercise-controller");
const ExerciseRoute = express.Router();

// exercise
ExerciseRoute.get("/all-exercise", GetAllExerciseData);
ExerciseRoute.get("/all-exercise/:id", GetExerciseDataById);
ExerciseRoute.get("/save-exercise", saveExercises);

module.exports = { ExerciseRoute };
