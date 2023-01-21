import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js"
import data from "../data.json" assert { type: "json" };

export const getCart = async (req, res) => {

    let getCart = await Cart.find()
    console.log(getCart);
    res.json(getCart)
    // res.json(getShop)
    // let cart = await Shop.find()
    // try {
    //     res.status(201).json(cart);
    // } catch (error) {
    //     res.status(400).json({message: error.message});
    // }
}

export const saveCart = async (req, res) => {
    try {
        // const insertedCart = await cart.save();
        const insertCart = await Cart.insertMany(data);
        res.status(201).json(insertCart);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

