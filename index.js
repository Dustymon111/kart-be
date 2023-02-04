import dotenv from 'dotenv'
import express from "express";
import ProductRoutes from "./routes/ProductRoutes.js"
import CartRoutes from "./routes/CartRoutes.js"
import ShopRoutes from './routes/ShopRoutes.js'
import Category from './models/CategoryModel.js';
import { authRoute } from './routes/AuthRoutes.js';
import { userRoute } from './routes/UserRoutes.js';
import data from './data.json' assert {type: "json"}
import categories from './categories.json' assert {type: "json"}
import Product from './models/ProductModel.js';
import Shop from './models/ShopModel.js';
import User from './models/UserModel.js';
import db from './models/index.js';
import bcrypt from "bcryptjs";
import cors from "cors";
dotenv.config()

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

const Role = db.role;

db.mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Terhubung ke DataBase...");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(ProductRoutes);
app.use(CartRoutes);
app.use(ShopRoutes)
authRoute(app)
userRoute(app)

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
        }
    });
    Shop.estimatedDocumentCount((err, count ) => {
        if (!err && count == 0){
            try{
                data.map(async sh=>{
                    const prd = await Product.insertMany(sh.products)
                    let temp = {...sh}
                    temp.products = prd.map(p => p._id)
                    const cart = await Shop.create(temp)
                    cart.products.map(async id =>{
                        await Product.findByIdAndUpdate({_id: id}, {shop: cart._id}, {new:true})
                    })
                })
                console.log("added shops and products to shop and product collection");
            }catch(err){
                console.log(err);
            }
        }
    })
    User.countDocuments({username: 'user'},(err, count) => {
        if (!err && count === 0) {
            new User({
                username: "user",
                email: "user@mail.com",
                fullname: "user",
                password: bcrypt.hashSync('user', 8)
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added dummy user to User collection");
            });
        }
    });
    Category.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            try{
                categories.map(cat => {
                    Category.create(cat)
                })
                console.log("added product categories to categories collection");
            }catch(err){
                console.log(err);
            }                     
        }
    });
}

app.listen(8080, () => console.log('Server Running at http://localhost:8080'));