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
    phone: String,
    address: String,
    userType: {
      type: String,
      enum: ['type1', 'type2'],
      default: 'type1',
    },
    status: {
      type: String,
      enum: ['bloked', 'active'],
      default: 'active',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    subscription:{
      type: Boolean,
      default: false,
    },
    freeTrail:{
      type: Boolean,
      default: true,
    },
    resetToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
