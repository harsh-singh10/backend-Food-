import express from "express"
import { placeOrder } from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.middleware.js";

const orderRoute = express.Router();

orderRoute.post("/place" , authMiddleware,placeOrder);

export default orderRoute