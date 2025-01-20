// routes/login.js
const express = require("express");
const UserRouter = express.Router();
const {
  RegisterUser,
  LoginUser,
  ForgotPassword,
  ResetPassword,
  createAppointment,
  getAppointments,
  verifyDoctor,
  listDoctors,
  listVerifiedDoctors,
  listAppointments,
  listSingleDoctor,
  sendMailFromDoctor,
} = require("../../controllers/user-controller");
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

UserRouter.post("/register", upload.single("avatar"), RegisterUser);

UserRouter.post("/login", LoginUser);
UserRouter.get("/list-doctors", listDoctors);
UserRouter.get("/list-doctor/:id", listSingleDoctor);

UserRouter.get("/list-doctors-verified", listVerifiedDoctors);
UserRouter.get("/list-appointments/:id", listAppointments);

UserRouter.post("/forgot-password", ForgotPassword);
UserRouter.post("/send-mail", sendMailFromDoctor);

UserRouter.put("/password-reset/:token", ResetPassword);
UserRouter.post("/create-appointment", createAppointment);
UserRouter.post("/get-appointments", getAppointments);
UserRouter.post("/verify-doctor", verifyDoctor);

module.exports = { UserRouter };
