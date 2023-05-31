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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).limit(req.query._end);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

// userName: { type: String, required: true},
//   userEmail: { type: String, required: true},
//   userPhoneNo: { type: String, required: true},
//   userPhotoUrl: { type: String, required: true},
//   password: { type: String, required: true}
//   userAddress: { type: String, required: true},

const createUser = async (req, res) => {
  try {
    const { userName, userEmail, userPhotoUrl, userAddress, userPhoneNo, password } = req.body;
  
    const userExists = await User.findOne({ userEmail });
  
    if(userExists) return res.status(200).json(userExists);
      const profilePicture = await cloudinary.uploader.upload(userPhotoUrl);
    const newUser = await User.create({
      userName,
      userEmail,
      userPhotoUrl: profilePicture.secure_url,
      userAddress,
      userPhoneNo,
      password
    })
  
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const getUserInfoByID = async (req, res) => {
  try {
    const { userName, userEmail, password } = req.params;
    
    const user = await User.findOne({ userName: userName, userEmail: userEmail, password: password});
    // .populate('allProperties');
    
    if(user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}; 

export {
  getAllUsers,
  createUser,
  getUserInfoByID,
}
