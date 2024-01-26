import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, "Please provide an image url"],
    // trim: true,
  },
  mrp: {
    type: Number,
    required: [true, "Please provide an MRP"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  discount: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
    // trim: true,
  },
  brand: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    // trim: true,
  },
  gender: {
    type: String,
    enum: ["Men", "Women"],
  },
  color: String,
  category: {
    type: String,
    required: true,
  },
  sizes: [
    {
      type: String,
    },
  ],
});

productSchema.pre("save", function (next) {
  this.discount = Math.floor(((this.mrp - this.price) / this.mrp) * 100);
  next();
});

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
