import express from "express";
import { saveShop, shopChecked } from "../controllers/ShopController.js";

const router = express.Router()

router.post('/saveShop', saveShop)
router.post('/cart/:id/update-selected', shopChecked)

export default router