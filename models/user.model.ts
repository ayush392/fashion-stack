import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
    },
    username: {
      type: String,
      required: [true, "please provide a username"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Buyer"],
      default: "User",
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
