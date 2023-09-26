import nodemailer from "nodemailer";
import { EMAIL, EMAIL_PASSWORD } from "../config/config.js";

const sendActivationEmail = async (user, verificationToken) => {
  const transporter = nodemailer.createTransport({
    // configure your email sending service here
    // For example, you can use Gmail SMTP or other email services
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: user.email,
    subject: "Activate Your Account",
    html: `
      <p>Dear ${user.userName},</p>
      <p>Click <a href="http://localhost:5000/activate/${verificationToken}">here</a> to activate your account.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Activation email sent successfully.");
  } catch (error) {
    console.error("Error sending activation email:", error);
  }
};

export default sendActivationEmail;
