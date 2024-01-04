import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from "../controller/productController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAuthorize } from "../middleware/isAuthorize.js";


export const productRouter = express.Router();





// GET ALL PRODUCT ROUTES 
productRouter.route("/product").get(isAuthenticated, isAuthorize("admin"), getAllProducts);


// CREATE PRODUCT ROUTE -- Admin route
productRouter.route("/product/new").post(createProduct);


// UPDATE PRODUCT --Admin Route 
productRouter.route("/product/:id").get(getProductDetails).put(updateProduct).delete(deleteProduct);