import mongoose from "mongoose";
// PRODUCT MODEL 
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandlerClass.js";


// CREATE PRODUCT --Admin Route
export const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        if(!product) {
            return next(new  ErrorHandler("some went wrong while creating your product", 500));
        }
        res.status(200).json({
            "success": true,
            product,
        })
    } catch (error) {
        console.error(error);
    }
}


// GET ALL PRODUCT 
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        if(!products) {
            return next(new ErrorHandle("you don't have any products", 404));
        }
        res.status(201).json({
            "success": true,
            products,
        })
    } catch (error) {
        console.error(error);
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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
    }
}