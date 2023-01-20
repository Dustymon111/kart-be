import mongoose from "mongoose";
import Product from "./ProductModel"; 

const Shop = mongoose.Schema({
    name:{
        type: String,
        immutable: true,
        required: true
    },
    Products: [Product]
    
});
 
export default mongoose.model('Shops', Shop);