// routes/login.js
const express = require("express");
const UserRouter = express.Router();
const {
  RegisterUser,
  LoginUser,
  ForgotPassword,
  ResetPassword,
} = require("../../controllers/user-controller");
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

UserRouter.post("/register", upload.single("avatar"), RegisterUser);

UserRouter.post("/login", LoginUser);

UserRouter.post("/forgot-password", ForgotPassword);
UserRouter.put("/password-reset/:token", ResetPassword);

module.exports = { UserRouter };
