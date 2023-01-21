import mongoose from "mongoose";
// import Shop from "./ShopModel.js";

const ProductSchema = new mongoose.Schema({
    name:{  
        type: String,
        immutable: true,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    qty: {
        type: Number
    },
    is_discount:{
        type: Boolean,
        required: true
    },
    discount_value: {
        type: Number,
        default: 0
    },
    is_selected : {
        type: Boolean,
        default : false
    },
    image_url: {
        type: String
    }
});
 
const Product = mongoose.model('product', ProductSchema);

export default Product