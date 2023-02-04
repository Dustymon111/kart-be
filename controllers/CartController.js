import Shop from "../models/ShopModel.js";
import Product from "../models/ProductModel.js"
import Cart from "../models/CartModel.js";

export const getCart = async (req, res) => {   
    try{
        let total = 0
        let cart = await Cart.find().populate({
            path: "product",
            populate: {
                path: "shop"
            }
        })
        cart.map(item => {
            if (item.product.is_selected){
                total += (item.product.price - (item.product.price * item.product.discount_value / 100)) * item.product.qty
            }
        })
        res.json({total, cart})
    }catch(err){
        res.status(400).json({message: err})
    }
}

export const saveCart = async (req, res) => {
    let cart = new Cart({
        product: req.body.product,
        qty: req.body.qty,
        user_id: req.body.user_id
    })
    try {
        const nowCart = await Cart.findOne({product: cart.product})

        if (nowCart === null){
            await cart.save()
            await Product.findByIdAndUpdate({_id: cart.product}, {qty: cart.qty}) 
        }else{
            await Product.findByIdAndUpdate({_id: nowCart.product}, {qty: nowCart.qty + 1})
        }
        res.status(200).json({message: "Success"})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const checkAll = async (req, res) => {
    try {
        let allChecked = true
        const cart = await Shop.find()
        for (let i = 0; i < cart.length; i++){
            if (!cart[i].is_selected){
                allChecked = false
                break
            }
        }
        if(!allChecked){
            await Shop.updateMany({is_selected:false}, {is_selected:true})
            await Product.updateMany({is_selected:false}, {is_selected:true})
        }else{
            await Shop.updateMany({is_selected:true}, {is_selected:false})
            await Product.updateMany({is_selected:true}, {is_selected:false})
        }
        res.status(200).json({message: "Success"})
    }catch(err){
        res.status(400).json({message: err})
    }
}


export const removeCart = async (req, res) => {
    
    try{
        const product = await Product.find({is_selected: true}).select("_id")
        await Cart.deleteMany({product: {$in : product}})

        res.status(200).json({message: "Item has been deleted"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

