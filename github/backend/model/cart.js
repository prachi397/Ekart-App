const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'addProduct' },
    quantity: { type: Number, default: 1 },
    size: { type: String, default: 'S' },
    addtocart: { type: Boolean, default: false },
});

const cartSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userRegister' },
    userId: { type: String, required: true },
    items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
