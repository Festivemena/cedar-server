import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  productId: {type: String, required: true},
  productName: { type: String, required: true},
  productPhoto: { type: String, required: true },
  unitPrice: { type: Number, required: true},
  quantity: { type: Number, required: true},
  totalPrice: { type: Number, required: true},
  size: { type: Array, required: true},
});

const cartModel = mongoose.model('Cart', CartSchema);

export default cartModel;