import Shop from '../models/ShopModel.js'
import Product from '../models/ProductModel.js'
import data from '../data.json' assert {type: "json"}

export const saveShop = async (req, res) => {
    try{
        // console.log(data);
        data.map(async sh=>{
            const prd = await Product.insertMany(sh.products)
            let temp = {...sh}
            temp.products = prd.map(p => p._id)
            const cart = await Shop.create(temp)
            cart.products.map(async id =>{
                await Product.findByIdAndUpdate({_id: id}, {shop: cart._id}, {new:true})
            })
        })
        res.json({message: "Success"})
    }catch(err){
        res.status(400).json({message: err})
    }
}