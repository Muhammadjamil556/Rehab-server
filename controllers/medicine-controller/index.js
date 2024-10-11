const asyncHandler = require("express-async-handler");
const { medicinesData } = require("../../utils/static-data");

const GetAllMedicines = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .send({ message: "Successfully Fetched Data", response: medicinesData });
  } catch (error) {
    return handleErrorResponse(res, error);
  }
});

const GetMedicineById = asyncHandler(async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 1 || id > medicinesData.length) {
      return res.status(404).send({ message: "Medicine not found" });
    }

    const medicine = medicinesData.find((med) => med.id === id);
    return res
      .status(200)
      .send({ message: "Successfully Fetched Data", response: medicine });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Fetching Data", error: error.message });
  }
});

module.exports = { GetAllMedicines, GetMedicineById };
