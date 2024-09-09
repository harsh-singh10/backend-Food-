import userModel from "../models/userModels.js"

// add items to user cart 

const addToCart = async(req,res)=>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId})
        let cartData = await userData.cartData || {} ;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId , {cartData});
        res.json({success:true,message:"added to cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error while add to cart"})
        
    }
}


// remove to cart 

const removeFromCart = async (req,res) =>{
    try {
        // find user data 
        let userData = await userModel.findById(req.body.userId);
       // cart data nikal 
       let cartData = await userData.cartData;

       // cart item > 0 
       if (cartData[req.body.itemId] > 0) {
             cartData[req.body.itemId] -= 1;
        }
       //  update cart data in user model  
       await userModel.findByIdAndUpdate(req.body.userId , {cartData})

       res.json({success:true, message:"item removed success"})



    } catch (error) {
        console.log("error" , error);
        res.json({success:false, message:"error while removing item form cart"})
        
    } 
}

// fetch user Cart data 

const getCart = async (req,res)=>{
        try {
            // get userdata 
            let userData = await userModel.findById(req.body.userId);
            // cart data 
            let cartData = await userData.cartData || {};
            //send response 
            res.json({success:true, cartData})
        } catch (error) {
            console.log(error);
            res.json({success:false, message:"while fetching cart data"})
            
        }
}


export {addToCart , removeFromCart, getCart}