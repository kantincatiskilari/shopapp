import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export const signup = async (req,res,next) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const user = await new User({
            ...req.body,
            password:hashedPassword
        });
        const savedUser =await user.save();

        const {password,...others} = savedUser._doc;
        res.status(200).json(others);
    }catch(err){
        next(err);
    }
};

export const signin = async (req,res,next) => {
    try{
       const user = await User.findOne({email:req.body.email});
       !user && res.status(404).json("User not found");

       const validate = await bcrypt.compare(req.body.password,user.password);
       !validate && res.status(403).json("Forbidden");

       const token =  jwt.sign({id: user._id},process.env.JWT);

       const {password,...others} = user._doc
       
       res.
          cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({...others,token});
    }catch(err){
        next(err);
    }
};

export const logout = async (req,res,next) => {
    try{
       const user = await User.findByIdAndRemove(req.user.id);
       !user && res.status(404).json("User not found");
       
       res.
          cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(others);
    }catch(err){
        next(err);
    }
};