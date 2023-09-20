import mongoose from "mongoose";

const { Schema } = mongoose;
// Donation Schema
const donationSchema = Schema({
  amount: {
    type: Number,
    // required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    // required: true,
  },
  isCompleted:Boolean,
  transactionId: {
    type: String,
    // required: true,
  },
  // Add other donation properties as needed
});

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;