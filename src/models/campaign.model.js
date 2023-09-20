import mongoose from "mongoose";

const { Schema } = mongoose;

// Campaign Schema
const campaignSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  instituteName: {
    type: String,
    required: true,
  },
  instituteType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  milestones: String,
  currentProgress: String,
  milimg:String,
  proimg:String, // Array of image URLs
  closeCampaign: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Campaign =  mongoose.model("Campaign", campaignSchema)
export default Campaign;