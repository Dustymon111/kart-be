import mongoose from "mongoose";
import Product from "./ProductModel.js"; 


const Shop = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    is_selected: {
        type: Boolean,
        default: false
    },
    Products: [Product.schema]
    
});
 
export default mongoose.model('Shops', Shop);