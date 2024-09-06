import foodModel from "../models/foodModels.js";
import {ApiError} from "../utils/ApiError.js";
import fs from "fs"

// add food item 

const addFood = async(req,res)=>{
    let image_filename = `${req.file.filename}`
        const{name,description,price,category} = req.body;
       
         const food = new foodModel({
             name,
             description,
             price,
             category,
             image: image_filename
         })
         
         try {
            await food.save();
            res.json({success:true,message:"Food Added"})
         } catch (error) {
            console.log(error);
            res.json({success:false, message:"Error while saving file"})
            
         }
    
}


// all food list 

const list = async(req,res)=>{
    try {
        const foodItems = await foodModel.find({});
        res.json({success:true , data:foodItems})
    } catch (error) {

        console.log("error while fetching data from backend " ,error);
        res.json({success:false, message:"error while fetching data from backend"})
    }
}


// remove food 

const removeFood = async(req,res)=>{

  try {
      const foodItem = await foodModel.findById(req.body.id);
      fs.unlink(`upload/${foodItem.image}`,()=>{});
  
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({success:true, message:"removed food"})
  } catch (error) {
        console.log("error while deleting food" , error);
        res.json({success:false, message:"error whil removing food"})
  }
}



export {addFood , list ,removeFood}