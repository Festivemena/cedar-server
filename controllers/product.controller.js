import Product from '../mongodb/models/product.js';
import User from '../mongodb/models/user.js';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProducts = async (req, res) => {
  const { _end, _order, _start, _sort, title_like = "", productType = "" } = req.query;

  const query = {};

  if(productType !== '') {
    query.productType = productType;
  }

  if(title_like) {
    query.title = { $regex: title_like, $options: 'i' };
  }

  try {
    const count = await Product.countDocuments({ query });

    const products = await Product
      .find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order })

    res.header('x-total-count', count);
    res.header('Access-Control-Expose-Headers', 'x-total-count');

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message }) 
  }
};

const getProductDetail = async (req, res) => {
  const { id } = req.params;
  const productExists = await Product.findOne({ _id: id }).populate('creator');

  if(productExists) {
    res.status(200).json(productExists) 
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, productType, category, price, photo, subphoto1, subphoto2, subphoto3, subphoto4 } = req.body;
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    // const user = await User.findOne({ email }).session(session);
  
    // if(!user) throw new Error('User not found');
  
    const photoUrl = await cloudinary.uploader.upload(photo);
    const subphotoUrl1 = await cloudinary.uploader.upload(subphoto1);
    const subphotoUrl2 = await cloudinary.uploader.upload(subphoto2);
    const subphotoUrl3 = await cloudinary.uploader.upload(subphoto3);
    const subphotoUrl4 = await cloudinary.uploader.upload(subphoto4);
  
    const newProduct = await Product.create({
      name,
      description,
      productType,
      category,
      price,
      photo: photoUrl.url,
      subphoto1: subphotoUrl1.url,
      subphoto2: subphotoUrl2.url,
      subphoto3: subphotoUrl3.url,
      subphoto4: subphotoUrl4.url,
    });
  
    // user.allProducts.push(newProduct._id);
    // await user.save({ session });
  
    await session.commitTransaction();
  
    res.status(200).json(newProduct, { message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message }) 
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, productType, category, price, photo, subphoto1, subphoto2, subphoto3, subphoto4 } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);
    const subphotoUrl1 = await cloudinary.uploader.upload(subphoto1);
    const subphotoUrl2 = await cloudinary.uploader.upload(subphoto2);
    const subphotoUrl3 = await cloudinary.uploader.upload(subphoto3);
    const subphotoUrl4 = await cloudinary.uploader.upload(subphoto4);

    await Product.findByIdAndUpdate({ _id: id}, {
      name,
      description,
      productType,
      category,
      price,
      photo: photoUrl.url || photo,
      subphoto1: subphotoUrl1.url || subphoto1,
      subphoto2: subphotoUrl2.url || subphoto2,
      subphoto3: subphotoUrl3.url || subphoto3,
      subphoto4: subphotoUrl4.url || subphoto4,
    })

    res.status(200).json({ message: 'Product updated successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const productToDelete = await Product.findById({ _id: id}).populate('creator');

    if(!productToDelete) throw new Error('Product not found');

    const session = await mongoose.startSession();
    session.startTransaction();
    
    productToDelete.remove({session});
    productToDelete.creator.allProducts.pull(productToDelete);

    await productToDelete.creator.save({session});
    await session.commitTransaction();

      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

export {
  getAllProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
}