import ProductSchema from "../models/ProductModel.js";


export const getProducts = async (req, res) => {
    try {
        const Products = await ProductSchema.find();
        res.json(Products);
        console.log(Products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getProductById = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(404).json({message: "produk tidak ditemukan"});
    }
}
 
export const saveProduct = async (req, res) => {
    const product = new ProductSchema(req.body);
    try {
        const insertedProduct = await product.save();
        res.status(201).json(insertedProduct);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await ProductSchema.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateStock = async (req, res) => {
    try {
        const product = await ProductSchema.findByIdAndUpdate({_id:req.params.id}, {stock: req.body.stock}, {new:true});
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

 
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await ProductSchema.deleteOne({_id:req.params.id});
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}