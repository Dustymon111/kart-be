import Shop from "../models/ShopModel.js";

export const getCart = async (req, res) => {
    let cart = await Shop.find()
    try {
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const saveCart = async (req, res) => {
    const shop = new Shop(req.body);
    try {
        const insertedShop = await shop.save();
        res.status(201).json(insertedShop);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
