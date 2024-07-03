import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loginrouter from "./Routers/Loginrouter.js";
import ConnectDB from "./Database/Config.js";
import urlshortrouter from "./Routers/Urlshortrouter.js";

const app=express();

dotenv.config();
app.use(express.json());
app.use(cors());

ConnectDB();



app.use("/login",loginrouter);
app.use("/api",urlshortrouter);
  

app.get("/",(req,res)=>{
    res.status(200).send("App Connected Successfully")
})

app.listen(process.env.PORT,()=>{
    console.log("App Running Successfully");
})