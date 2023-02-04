import express from "express";
import { saveCart, getCart, removeCart, checkAll} from "../controllers/CartController.js";

const router = express.Router()

router.get('/cart', getCart)
router.post('/cart', saveCart)
router.put('/cart/check-all', checkAll)
router.delete('/cart', removeCart)


export default router