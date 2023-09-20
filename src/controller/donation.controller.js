import Donation from "../models/donation.model.js";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/config.js";
import Stripe from "stripe";
import { STRIPE } from "../config/config.js";
import User from '../models/user.model.js';

export const createDonation = async (req, res, next) => {
  const stripe = new Stripe(STRIPE);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 50 * 100,
    currency: "usd",

    automatic_payment_methods: {
      enabled: true,
    },
  });
  const token = req.cookies.accessToken;
  let newDonation = new Donation({
    amount: 50,
    campaign: req.params.campaignId,
    transactionId : paymentIntent.id,
  });
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_KEY);
      req.userId = decoded.id;
      req.isAdmin = decoded.isAdmin;
      newDonation.user = req.userId; // Assign the user field
    } catch (err) {
      return next(createError(403, "Token is not valid"));
    }
  }

  try {
    const savedDonation = await newDonation.save();
    const donation = await Donation.findOneAndUpdate(
      { transactionId: paymentIntent.id },
      { $set: { isCompleted:true}}, { new: true }
    );
    res.status(201).send({clientSecret:paymentIntent.client_secret});
  } catch (err) {
    next(err);
  }
};