import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import dotenv from "dotenv"


import foodRouter from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

// env config
dotenv.config();

// app 
const app = express();
const PORT = process.env.PORT

// middleware
app.use(express.json())
app.use(cors())


app.get("/" , (req,res)=>{
    res.send("Server is Working")
})

// databse connection 


connectDB()
.then( ()=>{
    app.listen(process.env.PORT || 4000 , ()=>{
        console.log(`Server is listning on port no ${PORT} `);
    })
} )
.catch( (err)=>{
        console.log("MONGO db connection fails !!!");
} )



// API end points 


app.use("/api/food",foodRouter)
// for using these images on frontend 
app.use("/images" ,express.static('upload'))


// for user 
app.use("/api/user",userRoute)

// cart 
app.use("/api/cart" , cartRouter)

// 
app.use("/api/order",orderRoute)