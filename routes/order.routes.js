import express from 'express';
import { getAllOrders, createOrder, getOrderByID } from '../controllers/order.controller.js';

const router = express.Router();

router.route('/').get(getAllOrders);
router.route('/:id').get(getOrderByID);
router.route('/').post(createOrder);
// router.route('/:id').patch(updateProduct);

export default router;