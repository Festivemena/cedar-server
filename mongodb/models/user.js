import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: { type: String},
  userEmail: { type: String },
  userPhoneNo: { type: String},
  userPhotoUrl: { type: String},
  userAddress: { type: String},
  password: { type: String},
  // allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;