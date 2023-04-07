import User from '../mongodb/models/user.js';

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
//   userAddress: { type: String, required: true},

const createUser = async (req, res) => {
  try {
    const { userName, userEmail, userPhotoUrl, userAddress, userPhoneNo } = req.body;
  
    const userExists = await User.findOne({ userEmail });
  
    if(userExists) return res.status(200).json(userExists);
  
    const newUser = await User.create({
      userName,
      userEmail,
      userPhotoUrl,
      userAddress,
      userPhoneNo,
    })
  
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const getUserInfoByID = async (req, res) => {
  try {
    const { userName, userEmail } = req.params;
    
    const user = await User.findOne({ userName: userName, userEmail: userEmail});
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