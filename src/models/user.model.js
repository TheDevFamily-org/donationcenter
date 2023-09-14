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
    isAdmin: {
      type: Boolean,
      default: false,
    },
    subscription:Boolean,
    freeTrail:Boolean,
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
