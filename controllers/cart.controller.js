import Cart from '../mongodb/models/cart.js'

const getAllCarts = async (req, res) => {
    try {
      const carts = await Cart.find({}).limit(req.query._end);
  
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  };

  const getCartDetail = async (req, res) => {
    const { id } = req.params;
    const cartExists = await Cart.findOne({ _id: id }).populate('creator');
  
    if(cartExists) {
      res.status(200).json(cartExists) 
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  };

const createCart = async (req, res) => {
    try {
      const { productId, productName, productPhoto, unitPrice, quantity, totalPrice, size } = req.body;
        
      const newCart = await Cart.create({
        productId,
        productName,
        productPhoto,
        unitPrice,
        quantity,
        totalPrice,
        size,
      })
    
      res.status(200).json(newCart);
    } catch (error) {
      res.status(500).json({ message: error.message })
    } 
  };

  const updateCart = async (req, res) => {
    try {
      const { id } = req.params;
      const { productId, productName, productPhoto, unitPrice, quantity, totalPrice, size } = req.body;
  
      const photoUrl = await cloudinary.uploader.upload(productPhoto);
      // const subphotoUrl1 = await cloudinary.uploader.upload(subphoto1);
      // const subphotoUrl2 = await cloudinary.uploader.upload(subphoto2);
      // const subphotoUrl3 = await cloudinary.uploader.upload(subphoto3);
      // const subphotoUrl4 = await cloudinary.uploader.upload(subphoto4);
  
      await Cart.findByIdAndUpdate({ _id: id}, {
        productName,
        productId,
        productType,
        unitPrice,
        quantity,
        totalPrice,
        size,
        photo: photoUrl.url || productPhoto,
      })
  
      res.status(200).json({ message: 'Cart updated successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  };
  
  
  const deleteCart = async (req, res) => {
    try {
      const { id } = req.params;
      
      const cartToDelete = await Cart.findById({ _id: id}).populate('creator');
  
      if(!cartToDelete) throw new Error('Cart not found');
  
      const session = await mongoose.startSession();
      session.startTransaction();
      
      cartToDelete.remove({session});
      cartToDelete.creator.allCart.pull(cartToDelete);
  
      await cartToDelete.creator.save({session});
      await session.commitTransaction();
  
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  };
  

  export {
    getAllCarts,
    getCartDetail,
    createCart,
    updateCart,
    deleteCart,
  }