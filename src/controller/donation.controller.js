import Donation from "../models/donation.model";
import createError from "../utils/createError";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/config.js";

const createDonation = async (req, res, next) => {
  const token = req.cookies.accessToken;
  var newDonation;
  if (token) {
    jwt.verify(token, JWT_KEY, async (err, payload) => {
      if (err) return next(createError(403, "Token is not valid"));
      req.userId = payload.id;
      req.isAdmin = payload.isAdmin;
    });
    newDonation = new Donation({
      amount : 50,
      user:userId,
      campaign:req.body.campaign,

    })
  }
  else{
    newDonation = new Donation({
      amount : 50,
      campaign:req.body.campaign,
    })
  }

  try {
    const savedDonation = await newDonation.save();
    res.status(201).send(savedDonation);
  } catch (err) {
    next(err);
  }
};
