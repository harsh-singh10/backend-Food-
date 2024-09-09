import orderModel from "../models/orderModels.js";
import userModel from "../models/userModels.js";
import stripe from "stripe";


// placing user order for frontend 

const placeOrder = async(req,res)=>{
    try {
        const newOrder = new orderModel({
            userId : req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        res.json({success:true,message:"data is saved in database " })
        

    } catch (error) {
        console.log("Error while order" , error);
        res.json({success:false,message:"error while ordring food"})
        
    }
}


// user order for front end 

const userOrder = async (req,res)=>{
        try {
                const order = await orderModel.find({userId:req.body.userId});
                res.json({success:true,data:order})
        } catch (error) {
                console.log(error);
                res.json({success:false,message:"error while fetching user order"})
                
        }   
}


// lsitning orders from admin panel 

const listOrder = async (req,res)=>{
        try {

            const orders = await orderModel.find({});
            res.json({success:true,data:orders})
            
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"error while fetching order for admin panel"})
            
        }
}


// api for updating status 

const updateStatus = async(req,res)=>{

    try {
       const status = req.body.status;
        if(status == "Delivered"){
            await orderModel.findByIdAndUpdate(req.body.orderId , {payment:true})
        }
        await orderModel.findByIdAndUpdate(req.body.orderId,{status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log("error while updating status " , error);
        res.json({success:false, message:"error "})
        
    }

}




export {placeOrder , userOrder , listOrder , updateStatus}