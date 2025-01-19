const express = require("express");
const { GetAllMedicines, GetMedicineById, saveMedicine } = require("../../controllers/medicine-controller");
const MedicineRoute = express.Router();

// medicine
MedicineRoute.get("/all-medicines", GetAllMedicines);
MedicineRoute.get("/all-medicines/:id", GetMedicineById);
MedicineRoute.get("/save-medicine", saveMedicine);

module.exports = { MedicineRoute };
