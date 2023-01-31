import express from "express";
import { saveShop } from "../controllers/ShopController.js";

const router = express.Router()

router.post('/saveShop', saveShop)

export default router