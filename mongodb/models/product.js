import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  subphoto1: { type: String, required: true},
  subphoto2: { type: String, required: true},
  subphoto3: { type: String, required: true},
  subphoto4: { type: String, required: true},
})

const productModel = mongoose.model('Property', ProductSchema);

export default productModel;

// name, mainImage, otherImage1, otherImage2, otherImage3, otherImage4, description, features, price, category, 