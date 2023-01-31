import mongoose from "mongoose"

const Schema = mongoose.Schema

const CartSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "product"
    },
    qty: {
        type: Number,
        required: true
    }
})

const Cart = mongoose.model("cart", CartSchema)

export default Cart