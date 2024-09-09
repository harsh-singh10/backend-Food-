import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator";

// token 

const createToken = (id)=>{
     return jwt.sign({id},process.env.JWT_SECRET)
}



// login user 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
      }
  
      
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
      }
  
      // Generate a token
      const token = createToken(user._id);
  
      // Return success response with the token
      res.status(200).json({ success: true, token:token });
        console.log("token" , token);
        
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error while logging in" });
    }

  };

  
  
// register user
const registerUser = async(req,res)=>{



    // check if user is already exists
    const {name,email,password} = req.body;
   try {
     const exists = await userModel.findOne({email});
     if(exists){
        return res.json({success:false, message:"user with this email already exists"})
     }

     // validating email format and strong password 
     if(!validator.isEmail(email)){
        return res.json({success:false, message:"please enter a valid email"})
     }
     // password length 
     if(password.length <5){
        return res.json({success:false, message:"password must be of greater than  8 digit"})
     }

     // hashing user password 
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);

     // create a new user 
     const newUser = new userModel({
        name,
        email,
        password : hashedPassword
     })

     // save user in database
     const user = await newUser.save()
     
     const token = createToken(user._id);

     res.json({success:true,token})


   } catch (error) {
        console.log(error);
        res.json({success:false,message:"error while register user"})
        
   }
    
}


export{ loginUser,registerUser }