import express from "express";
import { saveCart, getCart, shopChecked } from "../controllers/CartController.js";

const router = express.Router()

router.get('/cart', getCart)
router.post('/cart', saveCart)
router.post('/cart/:id/update-selected', shopChecked)

export default router