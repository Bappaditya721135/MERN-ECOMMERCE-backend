// MODEL 
import { Order } from "../models/orderModel.js";
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