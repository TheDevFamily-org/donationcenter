import Donation from "../models/donation.model.js";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/config.js";
import Stripe from "stripe";
import { STRIPE } from "../config/config.js";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(STRIPE);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 50 * 100,
    currency: "usd",

    automatic_payment_methods: {
      enabled: true,
    },
  });
  const token = req.cookies.accessToken;
  var newDonation;
  if (token) {
    jwt.verify(token, JWT_KEY, async (err, payload) => {
      if (err) return next(createError(403, "Token is not valid"));
      req.userId = payload.id;
      req.isAdmin = payload.isAdmin;
    });
    newDonation = new Donation({
      amount: 50,
      user: req.userId,
      campaign: req.params.campaignId,
      transactionId : paymentIntent.id,
    });
  } else {
    newDonation = new Donation({
      amount: 50,
      campaign: req.params.campaignId,
      transactionId : paymentIntent.id,
    });
  }

  try {
    const savedDonation = await newDonation.save();
    res.status(201).send({clientSecret:paymentIntent.client_secret});
  } catch (err) {
    next(err);
  }
};
