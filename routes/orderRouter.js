import express from "express";
// CONTROLLERS 
import { createNewOrder } from "../controller/orderController.js";
// MIDDLEWARRE 
import { isAuthenticated } from "../middleware/isAuthenticated.js"


// ORDER ROUTER  
const orderRouter = express.Router();


orderRouter.route("/order/new").post(isAuthenticated, createNewOrder);



export { orderRouter };