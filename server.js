import express from "express"
import cors from "cors"


// app 
const app = express();
const port = 4000

// middleware
app.use(express.json())
app.use(cors())


app.get("/" , (req,res)=>{
    res.send("Server is Working")
})


app.listen(port,()=>{
    console.log(`server is running on port no ${port} ` );
    
})