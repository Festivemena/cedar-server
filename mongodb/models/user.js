import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true},
  userEmail: { type: String, required: true},
  userPhoneNo: { type: String},
  userPhotoUrl: { type: String},
  userAddress: { type: String},
  // allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;