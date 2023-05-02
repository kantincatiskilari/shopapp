import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 15,
    },
    lastName: {
        type: String,
        required: true,
        max: 15,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:12
    },
    cart: [
        {
            productName: String,
            productDesc : String,
            productImg : String,
            price: Number,
            size: Number,
            color: String,
        }
    ]
},{timestamps: true});

const User = mongoose.model("User",UserSchema);

export default User;