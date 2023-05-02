import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    productName : {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    productImgs: {
        type: [String],
    },
    oldPrice: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    colors : {
        type: [String]
    },
    sizes : {
        type: [Number]
    }
},{timestamps: true});

export default mongoose.model("Product",ProductSchema);