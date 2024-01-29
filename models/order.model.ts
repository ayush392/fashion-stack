import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: [true, "Please select quantity"],
        dafault: 1,
      },
      size: {
        type: String,
        required: [true, "Please select valid size"],
      },
      price: {
        type: Number,
        required: true,
      },
      orderStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled", "Refunded"],
        default: "Processing",
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
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
    pincode: {
      type: Number,
      required: true,
    },
  },
});

const orderModel =
  mongoose.models.Product || mongoose.model("Order", orderSchema);

export default orderModel;
