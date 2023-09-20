import Subscription from "../models/subscription.model.js";
import Stripe from "stripe";
import { STRIPE } from "../config/config.js";
import User from "../models/user.model.js";

export const createSubscription = async (req, res, next) => {
  console.log("API endpoint reached."); // Add this line for debugging
  const stripe = new Stripe(STRIPE);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 50 * 100,
    currency: "usd",

    automatic_payment_methods: {
      enabled: true,
    },
  });
  const startDate = new Date();
  // Calculate the endDate by adding 30 days to the startDate
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 30);
  let newSubscription = new Subscription({
    userId: req.userId,
    startDate: startDate,
    endDate: endDate,
    transactionId: paymentIntent.id,
  });

  try {
    // const user = await User.findByIdAndUpdate(
    //   { _id: req.userId },
    //   { $set: { subscription: true, freeTrail: false } }
    // );
    // const savedSubscription = await newSubscription.save();
    res.status(201).send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.userId },
      { $set: { subscription: true, freeTrail: false } }
    );
  } catch (err) {
    next(err);
  }
};
