import mongoose from "mongoose";

const Schema = mongoose.Schema

const ShopSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    is_selected: {
        type: Boolean,
        default: false
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
});
 
const Shop = mongoose.model("shop", ShopSchema)

export default Shop