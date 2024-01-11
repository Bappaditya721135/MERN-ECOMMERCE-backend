import mongoose from "mongoose";
// PRODUCT MODEL 
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandlerClass.js";
// FILTER API FEATURE 
import { productFilter } from "../utils/productApiFeatures.js";


// CREATE PRODUCT --Admin Route
export const createProduct = async (req, res, next) => {
    try {
        // ASIGNING USER ID IN REQ.BODY.USER FEILD 
        req.body.user = req.user._id;
        const product = await Product.create(req.body);
        if(!product) {
            return next(new  ErrorHandler("some went wrong while creating your product", 500));
        }
        res.status(200).json({
            "success": true,
            product,
        })
    } catch (error) {
        next(error);
    }
}


// GET ALL PRODUCT 
export const getAllProducts = async (req, res, next) => {
    // BASIC PAGINATION 
    const page = req.query.page || 1;
    const maxProductPerPage = 3;
    const countDocument = await Product.countDocuments();
    try {
        const products = await Product.find(productFilter(req.query)).limit(maxProductPerPage).skip(maxProductPerPage * (page - 1));
        if(!products) {
            return next(new ErrorHandle("you don't have any products", 404));
        }
        res.status(201).json({
            "success": true,
            products,
            countDocument,
        })
    } catch (error) {
        next(error);
    }
}


// GET A SINGLE PRODUCT 
export const getProductDetails = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if(!product) {
            return next(new ErrorHandler("product not found", 404));
        }
        // IF PRODUCT EXIST 
        res.status(201).json({
            "success": true,
            product,
        })
    } catch (error) {
        next(error);
    }
}



// UPDATE PRODUCT 
export const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(500).json({
                "success": false,
                "message": "product not found"
            })
        }
        
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        res.status(201).json({
            "success": true,
            product,
        })
    } catch (error) {
        next(error);
    }
}


// DELETE PRODUCT 
export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        let product = await Product.findById(id);
        if(!product) {
            return res.status(500).json({
                "success": false,
                "message": "product not found"
            })
        }
        product = await Product.findByIdAndDelete(id);
        res.status(201).json({
            "success": true,
            "message": "product deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}



// CREATE REVIEW  
export const createReview = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        // CREATE PRODUCT REVIEW 
        const productReview = {
            user: userId,
            name: req.user.name,
            ...req.body
        }
        const product = await Product.findById(productId);
        if(!product) {
            return next(new ErrorHandler("product not found", 400));
        }
        
        // CHECK IF THE USER EXIST 
        const userExist = product.reviews.find(rev => rev.user.toString() === userId.toString());
        if(!userExist) {
            product.reviews.push(productReview);
            product.numOfReviews = product.numOfReviews + 1;
        }
        else {
            product.reviews.forEach((rev, i) => {
                if(rev.user.toString() === userId.toString()) {
                    product.reviews[i] = productReview;
                }
            })
        }


        // CHANGE THE OVARAL RATING  
        let avg = 0;
        product.reviews.forEach(rev => {
            avg = avg + rev.rating;
        })
        product.ratings = avg/product.reviews.length;
        
        // NOW SAVE THE REVIEW 
        await product.save();

        const message = userExist ? "review updated successfully" : "review addded successfully";
        res.status(200).json({
            success: true,
            message,
        })
    } catch (error) {
        next(error);
    }
}