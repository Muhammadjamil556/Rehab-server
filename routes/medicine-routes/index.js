const express = require("express");
const {
  GetAllMedicines,
  GetMedicineById,
} = require("../../controllers/medicine-controller");
const MedicineRoute = express.Router();

// medicine
MedicineRoute.get("/all-medicines", GetAllMedicines);
MedicineRoute.get("/all-medicines/:id", GetMedicineById);

module.exports = { MedicineRoute };
