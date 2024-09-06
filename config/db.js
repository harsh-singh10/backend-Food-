
import mongoose from "mongoose";



const connectDB =  async ()=>{

    try {
    //    const connectionInstance = await mongoose.connect(`mongodb+srv://harshditu:harsh1010@cluster0.0oc99.mongodb.net/food del`);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/FoodTest`);

       
       console.log(`\n Database connected you made it !! ${connectionInstance.connection.host} `);
       

        
    } catch (error) {
            console.error("MONGO connection Failed : " , error);
            process.exit(1); // process is a node function we can use it without importing

    }

}


export default connectDB;