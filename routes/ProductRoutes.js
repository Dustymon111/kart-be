import express from "express";
import { 
    getProducts, 
    updateStock,
    productChecked
} from "../controllers/ProductController.js";


const router = express.Router();
 
router.get('/Products', getProducts);
router.post('/Products/update-stock/:id', updateStock);
router.post('/Products/:id/update-selected', productChecked)
 
export default router;