import express from "express";
import {  createurl, geturl, visitcount } from "../Controllers/Urlshortner.js";


const urlshortrouter=express.Router();

urlshortrouter.post("/createurl",createurl);
urlshortrouter.get("/geturl/:shortid",geturl);
urlshortrouter.get("/visitcount/:shortId",visitcount);



export default urlshortrouter;