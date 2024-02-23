const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const addProductschema = new mongoose.Schema({
  category: { type: String, required: true },

  productName: { type: String, required: true },

  price: { type: Number, required: true },

  description: { type: String, required: true },

  image: { type: String, required: true },

  dateCreated: { type: String, required: true },

  reviews: [
    {
      rating: Number,
      feedback: String,
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: "userRegister",
      },
      createdAt:Date
    },
  ],
  totalRatings: { type: Number, default: 0 },
  countClicked: { type: Number, default: 0 },
});

const addProduct = new mongoose.model("addProduct", addProductschema);
module.exports = addProduct;
