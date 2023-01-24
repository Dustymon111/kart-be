import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js"
import data from "../data.json" assert { type: "json" };

export const getCart = async (req, res) => {
    try{
        let cart = await Cart.find().populate('Products')
        let total = 0;
        cart.map(shop=>{
            let allChecked = true
            shop.Products.map(product=>{
                if (!product.is_selected){
                    allChecked = false
                }
                allChecked? shop.is_selected = true : shop.is_selected = false
    
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
            })
        })
        res.json({total, cart})
    }catch(err){
        res.status(400).json({message: err})
    }
}

export const saveCart = async (req, res) => {
    try {
        // const insertedCart = await cart.save();
        data.map(async sh=>{
            const products = await Product.insertMany(sh.Products)
            sh.Products = products.map(p => p._id)
            const cart = await Cart.create(sh)
            // console.log(cart);
            // console.log(cart.Products);
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

export const deleteShop = async (req, res) => {
    try{
        let cart = await Cart.find().populate('Products')
        console.log(cart);
        cart.map(shop=>{
            shop.Products.map(async item => {
                if(shop.is_selected) {
                    await Product.deleteMany({shop: shop._id})
                    await Cart.findByIdAndDelete({_id: shop._id})
                }else if (item.is_selected){
                    await Product.deleteMany({_id: item._id})
                }
            })
        })
        res.status(200).json({message: "Item has been deleted"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

