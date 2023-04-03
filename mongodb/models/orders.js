import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  itemsNo: { type: Number, required: true},
  totalPrice: { type: Number, required: true},
  deliveryFee: { type: Number, required: true},
  userId: {type: String, required: true},
  userName: { type: String, required: true},
  userEmail: { type: String, required: true},
  userPhoneNo: { type: String, required: true},
  userPhotoUrl: { type: String, required: true},
  userAddress: { type: String, required: true},
  // unitProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
});

const orderModel = mongoose.model('Order', OrderSchema);

export default orderModel;