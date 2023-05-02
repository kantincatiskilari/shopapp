import express from 'express';
import { createProduct, getByBrand, getByDiscount, getByDiscountLimited, getByGender, getProduct, getRandomProducts, getAllProducts } from '../controllers/product.js';

const router = express.Router();

//add product
router.post("/create",createProduct);
//get all products
router.get("/",getAllProducts);
//get product
router.get("/product/:productDesc",getProduct);
//get random products
router.get("/random",getRandomProducts);
//get by gender
router.get("/find/:gender",getByGender);
//get by discount
router.get("/discount",getByDiscount);
//get by product
router.get("/brand/:productName",getByBrand);
//get by discount example
router.get("/discount/limited",getByDiscountLimited);

export default router;