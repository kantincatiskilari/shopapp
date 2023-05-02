import Product from "../models/Product.js";

//create a product
export const createProduct = async (req,res,next) => {
    try{
        const product = await new Product(req.body);

        const savedProduct = await product.save();

        res.status(200).json(savedProduct)
    }catch(err){
        next(err);
    }
};

//get all products
export const getAllProducts = async (req,res,next) => {
    try{
        const products = await Product.find();
        !products && res.status(404).json("Product not found.")

        res.status(200).json(products)
    }catch(err){
        next(err);
    }
};

//get a product
export const getProduct = async (req,res,next) => {
    try{
        const product = await Product.findOne({productDesc:req.params.productDesc.replaceAll("_"," ")});
        !product && res.status(404).json("Product not found.")

        res.status(200).json(product)
    }catch(err){
        next(err);
    }
};

//get random products
export const getRandomProducts = async (req,res,next) => {
    try{
        const products = await Product.aggregate([{ $sample: { size: 3 } }]);
        !products && res.status(404).json("Not found")

        res.status(200).json(products); 
    }catch(err){
        console.log(err);
    }
};

//get product by gender
export const getByGender = async (req,res,next) => {
    try{
        const products = await Product.find({gender:req.params.gender});
        !products && res.status(404).json("Product not found.")

        res.status(200).json(products.flat())
    }catch(err){
        next(err);
    }
};
//get product by discount
export const getByDiscount = async (req,res,next) => {
    try{
        const products = await Product.find()
        !products && res.status(404).json("Product not found.");

        const discount = products.filter((product) => product.oldPrice !== undefined)

        res.status(200).json(discount.flat())
    }catch(err){
        next(err);
    }
};
//get product by brand
export const getByBrand = async (req,res,next) => {
    try{
        const products = await Product.find({productName:req.params.productName})
        !products && res.status(404).json("Product not found.");

        const productsFiltered = products.filter((product) => product.gender === req.body.gender)

        res.status(200).json(productsFiltered.flat())
    }catch(err){
        next(err);
    }
};
//get product by discount examples
export const getByDiscountLimited = async (req,res,next) => {
    try{
        const products = await Product.find().limit(12);
        !products && res.status(404).json("Product not found.");

        const discount = products.filter((product) => product.oldPrice !== undefined)

        res.status(200).json(discount.flat())
    }catch(err){
        next(err);
    }
};


