import Product from "../models/ProductModel.js";
import Shop from "../models/ShopModel.js";
import Cart from "../models/CartModel.js";
import Category from "../models/CategoryModel.js"
import categories from '../categories.json' assert {type: "json"}

export const getProducts = async (req, res) => {
    try {
        const Products = await Product.find();
        res.json(Products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getProductsById = async (req, res) => {
    try {
        const Products = await Product.findById({_id: req.params.id});
        res.json(Products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 

export const updateStock = async (req, res) => {
    try {
        await Product.findByIdAndUpdate({_id: req.params.id}, {qty: req.body.qty}, {new:true});
        res.status(200).json({message:"Success"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getCategory = async (req, res) => {
    try{
        const category = await Category.find()
        res.json(category)
    }catch(err){
        res.status(400).json({message: err})
    }
}


export const saveCategory = async (req, res) => {
    try{
        categories.map(async cat => {
            await Category.create(cat)
        })
        res.json({message: "Success"})
    }catch(err){
        res.status(400).json({message: err})
    }
}

export const productChecked = async (req, res) => {
    try {
        const checked = await Product.findByIdAndUpdate({_id: req.params.id}, {is_selected: req.body.is_selected}, {new:true})
        res.status(200).json(checked);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}