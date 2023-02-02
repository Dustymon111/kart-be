import Shop from "../models/ShopModel.js";
import Product from "../models/ProductModel.js"
import Cart from "../models/CartModel.js";

export const getCart = async (req, res) => {
    try{
        let cart = await Cart.find().populate({
            path: "product",
            populate: {
                path: "shop"
            }
        })
        let total = 0
        
        res.json({total, cart})
    }catch(err){
        res.status(400).json({message: err})
    }
}

export const saveCart = async (req, res) => {
    let cart = new Cart({
        product: req.body.product,
        qty: req.body.qty
    })
    try {
        let data = await cart.save()
        res.status(200).json({message: "Success"})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const shopChecked = async (req, res) => {
    try {
        const checked = await Shop.findByIdAndUpdate({_id:req.params.id}, {is_selected: req.body.is_selected}, {new:true})
        // checked.Products.map(async item => {
        //     await Product.findByIdAndUpdate({_id: item}, {is_selected: req.body.is_selected}, {new:true})
        // })        

        res.status(200).json(checked);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const checkAll = async (req, res) => {
    try {
        let allChecked = true
        const cart = await Cart.find()
        for (let i = 0; i < cart.length; i++){
            if (!cart[i].is_selected){
                allChecked = false
                break
            }
        }
        if(!allChecked){
            await Cart.updateMany({is_selected:false}, {is_selected:true})
            await Product.updateMany({is_selected:false}, {is_selected:true})
        }else{
            await Cart.updateMany({is_selected:true}, {is_selected:false})
            await Product.updateMany({is_selected:true}, {is_selected:false})
        }
        res.status(200).json({message: "Success"})
    }catch(err){
        res.status(400).json({message: err})
    }
}


export const deleteShop = async (req, res) => {
    try{
        await Product.deleteMany({is_selected: {$eq:true}})
        await Cart.deleteMany({is_selected: {$eq:true}})
        res.status(200).json({message: "Item has been deleted"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

