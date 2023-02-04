import express from "express";
import { 
    getProducts, 
    getProductsById,
    updateStock,
    productChecked,
    saveCategory,
    getCategory
} from "../controllers/ProductController.js";


const router = express.Router();
 
router.get('/Products', getProducts);
router.get('/Products/category', getCategory)
router.post('/Products/category', saveCategory)
router.get('/Products/:id', getProductsById)
router.put('/Products/update-stock/:id', updateStock);
router.post('/Products/:id/update-selected', productChecked)
 
export default router;