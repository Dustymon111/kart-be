import express from "express";
import { saveCart, getCart } from "../controllers/CartController.js";

const router = express.Router()

router.get('/cart', getCart)
router.post('/cart', saveCart)

export default router