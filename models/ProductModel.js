import mongoose from "mongoose";

const Schema = mongoose.Schema

const ProductSchema = new mongoose.Schema({
    shop: {
        type: Schema.Types.ObjectId,
        ref: "shop"
    },
    name:{  
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    is_discount:{
        type: Boolean,
    },
    discount_value: {
        type: Number,
        required: true
    },
    is_selected : {
        type: Boolean,
        default : false
    },
    image_url: {
        type: String,
        required: true
    },
    category: Number
});
 
const Product = mongoose.model('product', ProductSchema);

export default Product