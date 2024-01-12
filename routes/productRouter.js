import express from "express";
import { createProduct, createReview, deleteProduct, deleteReview, getAllProducts, getAllReviews, getProductDetails, updateProduct } from "../controller/productController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAuthorize } from "../middleware/isAuthorize.js";


export const productRouter = express.Router();





// GET ALL PRODUCT ROUTES 
productRouter.route("/product").get(getAllProducts);


// CREATE PRODUCT ROUTE -- Admin route
productRouter.route("/product/new").post(isAuthenticated, isAuthorize("admin"), createProduct);


// UPDATE PRODUCT --Admin Route 
productRouter.route("/product/:id").get(getProductDetails).put(isAuthenticated, isAuthorize("admin"), updateProduct).delete(isAuthenticated, isAuthorize("admin"), deleteProduct);


// CREATE REVIEW 
productRouter.route("/review").post(isAuthenticated, createReview);

// GET ALL REVIEWS AND DELETE REVIEW 
productRouter.route("/reviews").get(getAllReviews).delete(isAuthenticated, deleteReview);