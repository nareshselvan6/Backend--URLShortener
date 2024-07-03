import express from "express";
import { activateaccount, forgetpassword, register, resetpswd, usersignin } from "../Controllers/Login.js";

const loginrouter=express.Router();

loginrouter.post("/register",register)
loginrouter.put("/accountactivation",activateaccount);
loginrouter.put("/loginuser",usersignin)
loginrouter.put("/forgetpassword",forgetpassword);
loginrouter.put("/resetpassword/:id/:token",resetpswd);



export default loginrouter;