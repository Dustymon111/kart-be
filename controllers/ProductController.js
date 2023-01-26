import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";

export const getProducts = async (req, res) => {
    try {
        const Products = await Product.find();
        res.json(Products);
        console.log(Products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 

export const updateStock = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate({_id:req.params.id}, {qty: req.body.qty}, {new:true});
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.deleteOne({_id:req.params.id});
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const productChecked = async (req, res) => {
    try {
        let allChecked = true
        const checked = await Product.findByIdAndUpdate({_id: req.params.id}, {is_selected: req.body.is_selected}, {new:true})
            .populate({
                path: 'shop',
                populate: {
                    path: 'Products'
                }
            })
        console.log(checked);
        checked.shop.Products.map(async item => {
            if (!item.is_selected){
                allChecked = false
            }
        })
        allChecked? await Cart.findByIdAndUpdate({_id: checked.shop._id}, {is_selected: true}):  await Cart.findByIdAndUpdate({_id: checked.shop._id}, {is_selected: false})
        res.status(200).json(checked);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}