const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/user-model.js");
const { handleErrorResponse } = require("../../utils/errorhandler.js");
const { CREATED, BAD_REQUEST } = require("../../utils/status.js");
const crypto = require("crypto");
const { sendToken } = require("../../utils/tokens.js");
const { cloudinary } = require("../../utils/cloudinary.js");
const { sendMail } = require("../../utils/mailer.js");

const FRONTEND_URL = "http://localhost:3000";

const resetTokenStore = new Map();

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

const ForgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    console.log("Error: No email provided");
    return res.status(400).json({ message: "Please provide your email" });
  }

  // Find the user by email
  console.log(`Searching for user with email: ${email}`);
  const user = await UserModel.findOne({ email });
  if (!user) {
    console.log(`Error: User with email ${email} not found`);
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a reset token and hash it
  const resetToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log("Generated reset token:", resetToken);

  // Set expiration to 10 minutes from now
  const expirationTime = Date.now() + 10 * 60 * 1000;
  resetTokenStore.set(user._id.toString(), { hashedToken, expirationTime });
  console.log(
    `Token stored for user ${user._id}, expires at ${new Date(expirationTime)}`
  );

  // Prepare reset password URL and message
  const resetUrl = `${FRONTEND_URL}/password-reset/${resetToken}`;
  const message = `You requested a password reset. Click here to reset your password: ${resetUrl}`;
  console.log(`Reset URL generated for user: ${resetUrl}`);

  // Send reset password email
  try {
    console.log(`Sending reset password email to ${email}`);
    await sendMail({
      to: email,
      subject: "Password Reset Request",
      type: "resetPassword",
      variables: {
        name: user.name,
        resetUrl,
      },
    });

    console.log(`Password reset email sent successfully to ${email}`);
    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    // Clear token if email fails to send
    resetTokenStore.delete(user._id.toString());
    console.log(`Error sending email to ${email}:`, error.message);
    return res.status(500).json({ message: "Email could not be sent" });
  }
});

const ResetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Hash the received token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user by matching hashed token in the in-memory store
  const userEntry = Array.from(resetTokenStore.entries()).find(
    ([, value]) =>
      value.hashedToken === hashedToken && value.expirationTime > Date.now()
  );

  if (!userEntry) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const userId = userEntry[0];

  // Hash and update the new password
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

  // Clear token from in-memory store
  resetTokenStore.delete(userId);

  res.status(200).json({ message: "Password has been reset successfully" });
});

module.exports = {
  RegisterUser,
  LoginUser,
  ForgotPassword,
  ResetPassword,
};
