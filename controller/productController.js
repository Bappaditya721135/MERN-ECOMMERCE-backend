import mongoose from "mongoose";
// PRODUCT MODEL 
import { Product } from "../models/productModel.js";


// CREATE PRODUCT 
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        if(!product) {
            return res.status(500).json({
                "success": false,
                "message": "some went wrong while creating your product"
            })
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
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if(!products) {
            return res.status(500).json({
                "success": false,
                "message": "you dont have any product"
            })
        }
        res.status(201).json({
            "success": true,
            products,
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