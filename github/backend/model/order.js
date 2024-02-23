const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "addProduct" },
      productName: String,
      description: String,
      image: String,
      size: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: { type: Number, required: true },
  user: {
    name: String,
    address: String,
    mobileNumber: String,
  },
  status: { type: String, default: "ordered" },
  dateCreated: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
