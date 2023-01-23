import express from "express";
import { 
    getProducts, 
    deleteProduct,
    updateStock,
    productChecked
} from "../controllers/ProductController.js";


const router = express.Router();
 
router.get('/Products', getProducts);
router.post('/Products/update-stock/:id', updateStock);
router.delete('/Products/:id', deleteProduct);
router.post('/Products/:id/update-selected', productChecked)
 
export default router;