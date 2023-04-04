import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  productType: { type: String },
  category: { type: String },
  price: { type: Number},
  photo: { type: String },
  subphoto1: { type: String},
  subphoto2: { type: String},
  subphoto3: { type: String},
  subphoto4: { type: String},
})

const productModel = mongoose.model('Product', ProductSchema);

export default productModel;

// name, mainImage, otherImage1, otherImage2, otherImage3, otherImage4, description, features, price, category, 