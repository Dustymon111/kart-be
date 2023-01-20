import express from "express";
import { 
    getProducts, 
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct,
    updateStock
} from "../controllers/ProductController.js";
 
const router = express.Router();
 
router.get('/Products', getProducts);
router.get('/Products/:id', getProductById);
router.post('/Products', saveProduct);
router.post('/Products/update-stock/:id', updateStock);
router.patch('/Products/:id', updateProduct);
router.delete('/Products/:id', deleteProduct);
 
export default router;