import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const mongoDB_URL= process.env.MONGODB_URL

const ConnectDB=async(req,res)=>{
    try {
        const connection=await mongoose.connect(mongoDB_URL);
        console.log("MongoDB connection Established");
        return connection;
    } catch (error) {
        res.status(500).send({message: "MongoDB connection Error"});
    }
}

export default ConnectDB;