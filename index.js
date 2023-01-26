import dotenv from 'dotenv'
import express from "express";
import ProductRoutes from "./routes/ProductRoutes.js"
import CartRoutes from "./routes/CartRoutes.js"
import mongoose from "mongoose";
import cors from "cors";
dotenv.config()

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

mongoose.connect(process.env.DATABASE_URL);
  
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Terhubung Ke Database...'));

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(ProductRoutes);
app.use(CartRoutes);
app.listen(8080, () => console.log('Server Running at http://localhost:8080'));