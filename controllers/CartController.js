import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js"
import data from "../data.json" assert { type: "json" };

export const getCart = async (req, res) => {
    try{
        let cart = await Cart.find().populate('Products')
        let total = 0;
        cart.map(shop=>{
            let allChecked = true
            shop.Products.map(async product=>{
                if(shop.is_selected || product.is_selected) {
                    if (product.is_discount){
                        total += (product.price - (product.price * product.discount_value / 100)) * product.qty
                    }else{
                        total += product.qty * product.price
                    }
                    
                    if (shop.is_selected && !product.is_selected){
                        total -= product.price * product.qty
                    }
                }
                if (!product.is_selected){
                    allChecked = false
                }
                allChecked? await Cart.findByIdAndUpdate({_id: shop._id}, {is_selected: true}):  shop.is_selected = false
            })

        })
        res.json({total, cart})
    }catch(err){
        res.status(400).json({message: err})
    }
}

export const saveCart = async (req, res) => {
    try {
        data.map(async sh=>{
            const products = await Product.insertMany(sh.Products)
            sh.Products = products.map(p => p._id)
            const cart = await Cart.create(sh)
            cart.Products.map(async id =>{
                await Product.findByIdAndUpdate({_id: id}, {shop: cart._id}, {new:true})
            })
        })
        res.status(201).json({message:"Success"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const shopChecked = async (req, res) => {
    try {
        const checked = await Cart.findByIdAndUpdate({_id:req.params.id}, {is_selected: req.body.is_selected}, {new:true})
        checked.Products.map(async item => {
            await Product.findByIdAndUpdate({_id: item}, {is_selected: req.body.is_selected}, {new:true})
        })        
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
        await Cart.deleteMany({is_selected: true})
        await Product.deleteMany({is_selected: true})
        res.status(200).json({message: "Item has been deleted"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

