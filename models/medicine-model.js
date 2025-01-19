const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    composition: { type: String, required: true },
    uses: { type: String, required: true },
    sideEffects: { type: String },
    imageURL: { type: String },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
