import express from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controller/productController.js";


export const productRouter = express.Router();





// GET ALL PRODUCT ROUTES 
productRouter.route("/product").get(getAllProducts);


// CREATE PRODUCT ROUTE -- Admin route
productRouter.route("/product/new").post(createProduct);


// UPDATE PRODUCT --Admin Route 
productRouter.route("/product/:id").put(updateProduct).delete(deleteProduct);