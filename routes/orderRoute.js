import express from "express"
import { listOrder, placeOrder, updateStatus, userOrder } from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.middleware.js";

const orderRoute = express.Router();

orderRoute.post("/place" , authMiddleware,placeOrder);

orderRoute.post("/userorder" , authMiddleware,userOrder);

orderRoute.get("/list" , listOrder)

orderRoute.post("/status" , updateStatus)

export default orderRoute