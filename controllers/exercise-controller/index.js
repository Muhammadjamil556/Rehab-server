const asyncHandler = require("express-async-handler");
const {
  exerciseData,
  exerciseDetailByIdData,
} = require("../../utils/static-data");

const GetAllExerciseData = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .send({ message: "Successfully Fetched Data", response: exerciseData });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
});
const GetExerciseDataById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const exerciseDetail = exerciseDetailByIdData.find(
      (exercise) => exercise.id === parseInt(id)
    );

    if (!exerciseDetail) {
      return res.status(404).send({ message: "Exercise not found" });
    }

    return res
      .status(200)
      .send({ message: "Successfully Fetched Data", response: exerciseDetail });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
});

module.exports = { GetAllExerciseData, GetExerciseDataById };
