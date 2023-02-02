import dotenv from 'dotenv'
import express from "express";
import ProductRoutes from "./routes/ProductRoutes.js"
import CartRoutes from "./routes/CartRoutes.js"
import ShopRoutes from './routes/ShopRoutes.js'
import { authRoute } from './routes/AuthRoutes.js';
import { userRoute } from './routes/UserRoutes.js';
import db from './models/index.js';

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
}

app.listen(8080, () => console.log('Server Running at http://localhost:8080'));