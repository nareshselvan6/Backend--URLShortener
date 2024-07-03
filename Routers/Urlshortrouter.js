import express from "express";
import {  createurl, geturl, todaylinks, totallinks, visitcount } from "../Controllers/Urlshortner.js";


const urlshortrouter=express.Router();

urlshortrouter.post("/createurl",createurl);
urlshortrouter.get("/geturl/:shortid",geturl);
urlshortrouter.get("/visitcount/:shortId",visitcount);
urlshortrouter.get("/totallinks",totallinks); //new
urlshortrouter.get("/todaylinks",todaylinks);


export default urlshortrouter;