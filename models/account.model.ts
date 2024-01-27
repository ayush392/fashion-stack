import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a userId"],
  },
  cart: [
    {
      quantity: {
        type: Number,
        required: [true, "Please select quantity"],
        dafault: 1,
      },
      size: {
        type: String,
        required: [true, "Please select valid size"],
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],

  wishlist: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],

  address: [
    {
      house: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
  ],

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],

  recentlyViewed: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

// accountSchema.pre("save", function (next) {
//   if (this.recentlyViewed.length > 10) {
//     this.recentlyViewed.shift();
//     next();
//   }
// });

const accountModel =
  mongoose.models.Account || mongoose.model("Account", accountSchema);

export default accountModel;
