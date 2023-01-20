import mongoose from "mongoose";
 
const Product = mongoose.Schema({
    name:{
        type: String,
        immutable: true,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    is_discount:{
        type: Boolean,
        required: true
    },
    discount_type : {
        type : String
    },
    dicount_value: {
        type: Number
    },
    image_url: {
        type: String
    }
});
 
export default mongoose.model('Products', Product);