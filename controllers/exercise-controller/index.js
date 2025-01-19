const asyncHandler = require("express-async-handler");
const { exerciseData, exerciseDetailByIdData } = require("../../utils/static-data");
const Exercise = require("../../models/exercise-model");
const GetAllExerciseData = asyncHandler(async (req, res) => {
  try {
    return res.status(200).send({ message: "Successfully Fetched Data", response: exerciseData });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
});
const GetExerciseDataById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const exerciseDetail = exerciseDetailByIdData.find((exercise) => exercise.id === parseInt(id));

    if (!exerciseDetail) {
      return res.status(404).send({ message: "Exercise not found" });
    }

    return res.status(200).send({ message: "Successfully Fetched Data", response: exerciseDetail });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
});

const saveExercises = async (req, res) => {
  try {
    // Use the static exerciseData to save to the database
    const savedExercises = await Exercise.insertMany(exerciseData);

    res.status(201).json({
      message: "Exercises saved successfully!",
      data: savedExercises,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to save exercises", error });
  }
};
module.exports = { GetAllExerciseData, GetExerciseDataById, saveExercises };
