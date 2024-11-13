const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const loadTemplate = (type, variables) => {
  const templatePath = path.join(
    __dirname,
    "../mails",
    `${type}EmailTemplate.html`
  );

  let template = fs.readFileSync(templatePath, "utf8");

  // Replace placeholders with actual values
  for (const [key, value] of Object.entries(variables)) {
    template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  return template;
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST_NAME || "smtp.gmail.com", // Ensure this is correct
  port: 465, // This is typically for SSL
  secure: true, // Use SSL for port 465
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});
const sendMail = async ({ to, subject, type, variables }) => {
  const htmlTemplate = loadTemplate(type, variables);

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
