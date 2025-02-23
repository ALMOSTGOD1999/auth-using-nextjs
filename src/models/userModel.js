import { verify } from "crypto";
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a valid password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiery: Date,
  verifyToken: String,
  verifyTokenExpiery: Date,
});

const User = mongoose.models.users || mongoose.models("users", userSchema);

export default User;
