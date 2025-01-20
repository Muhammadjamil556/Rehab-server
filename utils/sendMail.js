const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST_NAME || "smtp.gmail.com", // Ensure this is correct
  port: 465, // This is typically for SSL
  secure: true, // Use SSL for port 465
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});
const sendMailFromDoc = async (to, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendMailFromDoc };
