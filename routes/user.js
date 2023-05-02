import express from 'express';
import { addToCart, removeFromCart,removeAllItems } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//add to cart
router.put("/add",verifyToken,addToCart);
//remove from cart
router.put("/remove/:productId",verifyToken,removeFromCart);
//remove all items from cart
router.put("/remove",verifyToken,removeAllItems);

export default router;