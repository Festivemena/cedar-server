import Order from '../mongodb/models/orders.js'

const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find({}).limit(req.query._end);
  
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  };

  const createOrder = async (req, res) => {
    try {
      const { itemsNo, totalPrice, deliveryFee, userId, userName, userEmail, userPhoneNo, userPhotoUrl, userAddress, cart } = req.body;
        
      const newOrder = await Order.create({
        itemsNo,
        totalPrice,
        deliveryFee,
        userId,
        userName,
        userEmail,
        userPhotoUrl,
        userAddress,
        userPhoneNo,
        cart,
      })
    
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  };

  const getOrderByID = async (req, res) => {
    try {
      const { id } = req.params;
      
      const order = await Order.findOne({ _id: id});
      // .populate('allProperties');
      
      if(order) {
        res.status(200).json(order)
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }; 

  export {
    getAllOrders,
    createOrder,
    getOrderByID,
  }