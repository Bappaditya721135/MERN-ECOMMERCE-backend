import express from "express";
// CONTROLLERS 
import { createNewOrder, getOrderDetails, myOrder } from "../controller/orderController.js";
// MIDDLEWARRE 
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { isAuthorize } from "../middleware/isAuthorize.js";


// ORDER ROUTER  
const orderRouter = express.Router();

// CREATE NEW ORDER 
orderRouter.route("/order/new").post(isAuthenticated, createNewOrder);

// GET ORDER DETAILS FOR --Admin 
orderRouter.route("/order/:orderId").get(isAuthenticated, isAuthorize("admin"), getOrderDetails);

// GET MY ORDER 
orderRouter.route("/orders/me").get(isAuthenticated, myOrder);




export { orderRouter };