import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  itemsNo: { type: Number},
  totalPrice: { type: Number},
  deliveryFee: { type: Number},
  userId: {type: String},
  userName: { type: String},
  userEmail: { type: String},
  userPhoneNo: { type: String},
  userPhotoUrl: { type: String},
  userAddress: { type: String},
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
});

const orderModel = mongoose.model('Order', OrderSchema);

export default orderModel;