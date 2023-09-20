import mongoose from "mongoose";
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  transactionId:String,
});

const subscription = mongoose.model("Subscription", subscriptionSchema);

export default subscription;
