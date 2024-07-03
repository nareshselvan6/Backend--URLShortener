import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    service: "Gmail", 
    auth: {
      user: process.env.PASS_EMAIL,
      pass: process.env.PASS_CODE,
    },
  });
  
