const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/user-model.js");
const { handleErrorResponse } = require("../../utils/errorhandler.js");
const { CREATED, BAD_REQUEST } = require("../../utils/status.js");

const { sendToken } = require("../../utils/tokens.js");
const { cloudinary } = require("../../utils/cloudinary.js");
const { sendMail } = require("../../utils/mailer.js");

// Register User
const RegisterUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    // Send email with user details
    const avatar = req.file;

    if (!name || !password || !email || !confirmPassword) {
      return res.status(400).send({
        message: "Please enter name, password, email, and confirm password",
      });
    }

    // Validate the email format
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      return res.status(BAD_REQUEST).send({ message: "Invalid email format" });
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res
        .status(BAD_REQUEST)
        .send({ message: "Password and confirm password do not match" });
    }

    const isEmailExist = await UserModel.findOne({ email: email });
    if (isEmailExist) {
      return res.status(BAD_REQUEST).send({ message: "User already exists" });
    }

    // Upload avatar to Cloudinary
    let avatarUrl = null;
    if (avatar) {
      try {
        await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "avatars",
              transformation: [{ width: 500, height: 500, crop: "limit" }],
            },
            (error, result) => {
              if (error) {
                reject(new Error(error.message));
              } else {
                avatarUrl = result.secure_url;
                resolve();
              }
            }
          );
          uploadStream.end(avatar.buffer);
        });
      } catch (uploadError) {
        return res.status(500).send({
          message: "Failed to upload avatar",
          error: uploadError.message,
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword, avatar: avatarUrl };
    const newUser = await UserModel.create(user);
    const sendUser = { name, email, avatar: avatarUrl };
    // await sendMail(email, name, email, password).catch((err) => {
    //   console.log("Error sending nodemailer error");
    // });

    if (newUser) {
      return res.status(CREATED).send({
        message: "User has been created successfully",
        user: sendUser,
      });
    } else {
      return res.status(500).send({
        message: "Failed to create user",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
});

// Login Users
const LoginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await UserModel.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // Password is valid, send token
    sendToken(user, 200, res);
  } catch (error) {
    // Handle any unexpected errors
    return handleErrorResponse(res, error);
  }
});

module.exports = {
  RegisterUser,
  LoginUser,
};
