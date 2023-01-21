import mongoose from "mongoose";
import Product from "./ProductModel.js"; 

const Schema = mongoose.Schema

const CartSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    is_selected: {
        type: Boolean,
        default: false
    },
    Products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
});
 
const Cart = mongoose.model("cart", CartSchema)

export default Cart