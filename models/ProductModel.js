import mongoose from "mongoose";

const Schema = mongoose.Schema

const ProductSchema = new mongoose.Schema({
    name:{  
        type: String,
    },
    price:{
        type: Number,
    },
    qty: {
        type: Number
    },
    is_discount:{
        type: Boolean,
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
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "cart"
    }
});
 
const Product = mongoose.model('product', ProductSchema);

export default Product