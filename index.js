import dotenv from 'dotenv'
import express from "express";
import Routes from "./routes/Routes.js";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js"
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
app.use(Routes);
app.use(UserRoutes);
app.use(ProductRoutes);
app.listen(3000, () => console.log('Server Running at http://localhost:3000'));