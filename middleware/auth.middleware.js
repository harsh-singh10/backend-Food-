import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next)=>{
    // token from req.headers
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false,message:'Not Authorized Login Again'});
    }
    try {
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log("errt" . error);
        res.json({success:false,message:"you must login first"})
        
    }
}


export default authMiddleware