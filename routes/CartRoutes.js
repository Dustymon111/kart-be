import express from "express";
import { saveCart, getCart, shopChecked, deleteShop, checkAll} from "../controllers/CartController.js";
import authJwt from "../middlewares/authJwt.js";

const router = express.Router()

router.get('/cart', getCart)
router.post('/cart', saveCart)
router.post('/cart/:id/update-selected', shopChecked)
router.put('/cart/check-all', checkAll)
router.delete('/cart', deleteShop)


export default router