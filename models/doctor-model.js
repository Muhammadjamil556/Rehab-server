const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESSTOKEEXPIRETIME, REFRESHTOKEEXPIRETIME } = require("../enums/index");
const { APP_ROLES } = require("../utils/enums");

// Define Appointment Schema
const AppointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel", // Reference to the Patient (UserModel)
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // Time can be stored as a string (e.g., '2:30 PM')
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"], // Appointment status
      default: "Scheduled",
    },
  },
  { timestamps: true }
);

// Define Doctor Schema
const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: APP_ROLES.DOCTOR,
    },
    appointments: [AppointmentSchema], // Link to the Appointment Schema
    verified: {
      type: Boolean,
      default: false, // default value is set to false for unverified doctors
    },
  },
  { timestamps: true }
);

// Sign In Access Token
DoctorSchema.methods.signAccessToken = function () {
  return jwt.sign({ id: this._id }, ACCESS_TOKEN_SECRET || " ", {
    expiresIn: ACCESSTOKEEXPIRETIME,
  });
};

DoctorSchema.methods.signRefreshToken = function () {
  return jwt.sign({ id: this._id }, REFRESH_TOKEN_SECRET || " ", {
    expiresIn: REFRESHTOKEEXPIRETIME,
  });
};

const DoctorModel = mongoose.model("DoctorModel", DoctorSchema);
const AppointmentModel = mongoose.model("AppointmentModel", AppointmentSchema);

module.exports = { DoctorModel, AppointmentModel };
