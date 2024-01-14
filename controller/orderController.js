// MODEL 
import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandlerClass.js";


export const createNewOrder = async (req, res, next) => {
    try {
        const { shippingInfo, orderedItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
        const orderObj = {
            shippingInfo,
            orderedItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: req.user._id,
            paidAt: Date.now(),
            
        }

        // CREATE ORDER 
        const order = await Order.create(orderObj);
        if(!order) {
            return next(new ErrorHandler("order not created", 400));
        }
        res.status(200).json({
            success: true,
            order,
        })
    } catch (error) {
        next(error);
    }
}


// GET ORDER DETAILS FOR --Admin 
export const getOrderDetails = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate("user", "name email");
        if(!order) {
            return next(new ErrorHandler("order not found", 404));
        }

        res.status(200).json({
            success: true,
            order,
        })
    } catch (error) {
        next(error);
    }
}


// GET MY ORDER DETAILS 
export const myOrder = async (req, res, next) => {
    try {
        const order = await Order.find({user: req.user._id});
        if(!order) {
            return next(new ErrorHandler("order not found", 404));
        }
        res.status(200).json({
            success: true,
            order,
        })
    } catch (error) {
        next(error);
    }
}


// GET ALL ORDERS FOR --Admin 
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        if(!orders) {
            return next(new ErrorHandler("orders not found", 404));
        }
        res.status(200).json({
            success: true,
            orders,
        })
    } catch (error) {
        next(error);
    }
}


// UPDATE ORDER FOR --Admin 
export const updateOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;
        const order = await Order.findById(orderId);
        if(!order) {
            return next(new ErrorHandler("order not found", 404));
        }
        // CHECK IF THE ORDER HAS ALREADY BEEN DELEVERED 
        if(order.orderStatus === "Delevered") {
            return next(new ErrorHandler("Order has already been delevered"));
        }

        // DONT UPDATE THE STOCKS IF THE PRODUCT IS ALREADY SHIPPED  
        if(order.orderStatus === "Shipped" && orderStatus === "Shipped") {
            return next(new ErrorHandler("product has already been shipped", 400));
        }

        order.orderStatus = orderStatus;

        // ONLY UPDATE THE STOCKS WHEN PRODUCT IS SHIPPED
        if(order.orderStatus === "Shipped") {
            // NOW UPDATE THE STOCKS FOR EACH ORDERED ITEMS  
            order.orderedItems.forEach(async (order) => {
                await updateStocks(order.product, order.quantity);
            })
        }
        order.save();
        res.send("update order");
    } catch (error) {
        next(error);
    }
}


// UPDATE STOCKS FUNCTION 
async function updateStocks(id, quantity) {
    try {
        const product = await Product.findById(id);
        if(!product) {
            return next(new ErrorHandler("product not found"));
        } 
        // NOW UPDATE THE PRODUCT STOCKS 
        product.stocks -= quantity;
        product.save();
    } catch (error) {
      next(error);  
    }
}