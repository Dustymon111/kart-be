
import express from "express";
import {get,create,update,destroy} from "../controllers/HomeController.js";

const router = express.Router();
 
router.get('/', get);
// export default router
export default router;