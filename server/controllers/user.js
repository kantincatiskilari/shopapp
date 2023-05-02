import Auth from '../models/User.js';

//add to cart
export const addToCart = async (req,res,next) => {
    try{
        const updatedUser = await Auth.findByIdAndUpdate(req.user.id,{$push:{cart:req.body}},{new:true});

        let { password, ...others } = updatedUser._doc;

        res.status(200).json(others)
    }catch(err){
        console.log(err);
    }
};

//remove from cart
export const removeFromCart = async (req,res,next) => {
    try{
        const updatedUser = await Auth.findByIdAndUpdate(req.user.id,{$pull:{cart:{_id:req.params.productId}}},{new:true});

        let { password, ...others } = updatedUser._doc;

        res.status(200).json(others)
    }catch(err){
        console.log(err);
    }
};

//remove from cart
export const removeAllItems = async (req,res,next) => {
    try{
        const updatedUser = await Auth.findByIdAndUpdate(req.user.id,{$set:{cart:[]}},{new:true});

        let { password, ...others } = updatedUser._doc;

        res.status(200).json(others)
    }catch(err){
        console.log(err);
    }
};