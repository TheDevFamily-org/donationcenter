import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: function() {
        return this.userType === 'Recipient';
      },
    },
    address: {
      type: String,
      required: function() {
        return this.userType === 'Recipient';
      },
    },
    userType: {
      type: String,
      enum: ['Donor', 'Recipient'],
      required: true,
    },
    status: {
      type: String,
      enum: ['blocked', 'active', 'non-active'],
      default: 'non-active',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    subscription: {
      type: Boolean,
      default: false,
    },
    freeTrail: {
      type: Boolean,
      default: true,
    },
    resetToken: {
      type: String,
      default: "",
    },
    profilePicture: String, // Store URL or file path for profile picture
    recipientType: {
      type: String,
      required: function() {
        return this.userType === 'Recipient';
      },
    },
    donationType: {
      type: String,
      required: function() {
        return this.userType === 'Recipient';
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
