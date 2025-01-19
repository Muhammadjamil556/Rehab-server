const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/user-model.js");
const { handleErrorResponse } = require("../../utils/errorhandler.js");
const { CREATED, BAD_REQUEST } = require("../../utils/status.js");
const crypto = require("crypto");
const { sendToken } = require("../../utils/tokens.js");
const { cloudinary } = require("../../utils/cloudinary.js");
const { sendMail } = require("../../utils/mailer.js");
const { APP_ROLES } = require("../../utils/enums.js");
const { DoctorModel, AppointmentModel } = require("../../models/doctor-model.js");

const FRONTEND_URL = "http://localhost:3000";

const resetTokenStore = new Map();

// Register User
const RegisterUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;
    const avatar = req.file; // Assuming you're handling file uploads using something like multer.

    if (!name || !password || !email || !confirmPassword) {
      return res.status(400).send({
        message: "Please enter name, password, email, and confirm password",
      });
    }

    // Validate the email format
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      return res.status(400).send({ message: "Invalid email format" }); // BAD_REQUEST = 400
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Password and confirm password do not match" });
    }

    // Check if email already exists
    const isEmailExist = await UserModel.findOne({ email: email });
    if (isEmailExist) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Handle avatar upload
    let avatarUrl = null;
    if (avatar) {
      try {
        // Return a Promise to properly handle asynchronous avatar upload
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "avatars",
              transformation: [{ width: 500, height: 500, crop: "limit" }],
            },
            (error, result) => {
              if (error) {
                reject(new Error(error.message));
              } else {
                resolve(result.secure_url); // Resolve with the secure URL
              }
            }
          );
          uploadStream.end(avatar.buffer);
        });
        avatarUrl = result;
      } catch (uploadError) {
        return res.status(500).send({
          message: "Failed to upload avatar",
          error: uploadError.message,
        });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const user = { name, email, password: hashedPassword, avatar: avatarUrl };

    let newUser;
    if (role === APP_ROLES.PATIENT) {
      newUser = await UserModel.create(user);
    } else if (role === APP_ROLES.DOCTOR) {
      newUser = await DoctorModel.create(user);
    }

    if (!newUser) {
      return res.status(500).send({
        message: "Failed to create user",
      });
    }

    const sendUser = { name, email, avatar: avatarUrl };

    // Uncomment and implement the email sending functionality
    // await sendMail(email, name, email, password).catch((err) => {
    //   console.log("Error sending email:", err);
    // });

    return res.status(201).send({
      message: "User has been created successfully",
      user: sendUser,
    });
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
      return res.status(400).send({ message: "Please provide email and password" });
    }

    // Find user or doctor by email
    let user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      user = await DoctorModel.findOne({ email }).select("+password");
    }

    // Check if the user/doctor exists
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
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  console.log("Generated reset token:", resetToken);

  // Set expiration to 10 minutes from now
  const expirationTime = Date.now() + 10 * 60 * 1000;
  resetTokenStore.set(user._id.toString(), { hashedToken, expirationTime });
  console.log(`Token stored for user ${user._id}, expires at ${new Date(expirationTime)}`);

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
  const userEntry = Array.from(resetTokenStore.entries()).find(([, value]) => value.hashedToken === hashedToken && value.expirationTime > Date.now());

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

// Create Appointment
const createAppointment = asyncHandler(async (req, res) => {
  try {
    const { doctorId, patientId, date, time } = req.body;

    // Check if doctor and patient exist
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }

    const patient = await UserModel.findById(patientId); // Assuming `UserModel` is the patient model
    if (!patient) {
      return res.status(404).send({ message: "Patient not found" });
    }

    // Check if the same time slot already has an appointment
    const existingAppointment = doctor.appointments.find((appointment) => appointment.date === date && appointment.time === time);

    if (existingAppointment) {
      return res.status(400).send({ message: "This time slot is already booked" });
    }

    // Create new appointment
    const newAppointment = new AppointmentModel({
      patient: patientId,
      date,
      time,
      status: "Scheduled", // Appointment status
    });

    // Save the appointment to the doctor's appointments
    doctor.appointments.push(newAppointment);
    await doctor.save();

    // Return success response
    return res.status(201).send({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
});
const getAppointments = asyncHandler(async (req, res) => {
  try {
    const { doctorId } = req.body; // Get doctorId from request params

    // Find the doctor by ID and populate the appointments with patient details
    const doctor = await DoctorModel.findById(doctorId).populate("appointments.patient", "name email avatar"); // Populate patient info in appointments

    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }

    // Return the doctor's appointments
    return res.status(200).send({
      message: "Appointments retrieved successfully",
      appointments: doctor.appointments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
});

const verifyDoctor = asyncHandler(async (req, res) => {
  try {
    const { doctorId } = req.body; // Get doctorId from request params

    // Find the doctor by ID
    const doctor = await DoctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }

    // Set the verified field to true
    doctor.verified = true;

    // Save the doctor document
    await doctor.save();

    return res.status(200).send({
      message: "Doctor has been verified successfully",
      doctor: {
        name: doctor.name,
        email: doctor.email,
        verified: doctor.verified,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
});

module.exports = {
  RegisterUser,
  LoginUser,
  ForgotPassword,
  ResetPassword,
  createAppointment,
  getAppointments,
  verifyDoctor,
};
