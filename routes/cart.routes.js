import express from 'express';
import { createCart, getAllCarts, getCartDetail, updateCart, deleteCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.route('/').get(getAllCarts);
router.route('/:id').get(getCartDetail);
router.route('/').post(createCart);
router.route('/:id').patch(updateCart);
router.route('/:id').delete(deleteCart);

export default router;