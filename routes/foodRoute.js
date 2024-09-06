import express from "express"
import { addFood , list ,removeFood } from "../controllers/foodController.js";
import multer from "multer";

import { upload } from "../middleware/multer.middleware.js";

const foodRouter = express.Router();


foodRouter.post("/add" ,upload.single('image'), addFood)

foodRouter.get("/list" , list);

foodRouter.post("/remove" , removeFood)



export default foodRouter;