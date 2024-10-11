// routes/login.js
const express = require("express");
const UserRouter = express.Router();
const {
  RegisterUser,
  LoginUser,
} = require("../../controllers/user-controller");
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

UserRouter.post("/register", upload.single("avatar"), RegisterUser);

UserRouter.post("/login", LoginUser);

module.exports = { UserRouter };
