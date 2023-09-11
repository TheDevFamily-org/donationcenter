import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_KEY } from "../config/config.js";
import createError from "../utils/createError.js";
import { EMAIL, EMAIL_PASSWORD } from "../config/config.js";
import NodeMailer from "nodemailer";


export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
        isAdmin: newUser.isAdmin,
      },
      JWT_KEY
    );

    const { password, ...info } = newUser._doc;
    
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
    // res.status(201).send("User has been created");
  } catch (err) {
    next(err);
    // res.status(500).send("Something went wrong: " + err.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not Found"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(404, "Wrong password or username"));

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      JWT_KEY
    );

    const { password, ...info } = user._doc;
    
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

export const forgotpassword = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  // Generate a unique reset token
  const otpToken = Math.floor(100000 + Math.random() * 900000).toString();

  // Update user's reset token in database
  const updateToken = await User.findByIdAndUpdate(
    { _id: user._id },
    { $set: { resetToken: otpToken } }
  );

  // Send reset password email
  const transporter = NodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "aa17262211@gmail.com",
    to: email,
    subject: "Reset your password",
    text: `Your OTP to reset your password is ${otpToken}. This OTP is valid for 12 hours.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Failed to send reset password email." });
    } else {
      next(error);
    }
  });
};

export const resetpassword = async (req, res, next) => {
  const otp = req.body.otp;
  try {
    const user = await User.findOne({ resetToken:otp });
    
    if (!user) {
      return next(createError(404, "Invalid or expired reset token."));
    }

    // Update user's password in database
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.resetToken = null;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (e) {
    next(e);
  }
};

export const updatepassword = async (req, res, next) => {
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  try {
    const user = await User.findOne({ _id:req.userId });
    
    if (!user) {
      return next(createError(401, "Unauthorized"));
    }
    const isCorrect = bcrypt.compareSync(oldPass, user.password);
    if (!isCorrect) return next(createError(403, "Wrong password"));
    // Update user's password in database
    user.password = bcrypt.hashSync(newPass, 10);
    await user.save();

    return res.status(200).json({ message: "Password Update successfully." });
  } catch (e) {
    next(e);
  }
};
