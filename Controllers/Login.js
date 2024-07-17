import logincrediential from "../Models/Loginmodel.js";
import bcrypt from "bcryptjs"
import { transporter} from "../Services/nodemailer.js"
import dotenv from "dotenv";

dotenv.config();

export const register=async(req,res)=>{
    try {
        const{firstname,lastname,email,password}=req.body;
        // const newregister = new logincrediential(req.body); // another method for saving new

        console.log(req.body);

        const pswd=await bcrypt.hash(password,10);

        const newregister=await logincrediential.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:pswd,
            isactive:false
        })

        const generatedlink=`https://url-shortner-frontend-three-eta.vercel.app/activateaccount`
        
      
        const info = await transporter.sendMail({
            from: process.env.PASS_EMAIL,
            to: email, 
            subject: "Account Activation", 
            html: `Hi ${firstname} ${lastname},<br><br>
             You are receiving this because we have requested you to activate your account.<br><br>
             Please click on the following link, or paste this into your browser to complete the process:<br><br>
             <a href="${generatedlink}">Click here to activate</a>`

          });

        res.status(200).send("check your mail and register it")

        
    } catch (error) {
        res.status(500).send("error occured while registering");
    }
}

export const activateaccount = async(req,res)=>{
    try {
        const{email,password}=req.body;

        const loginuser=await logincrediential.findOne({email})
        
        const pswrd = await bcrypt.compare(password,loginuser.password);

        if(!pswrd){
            res.status(401).send("incorrect password")
        }


        const pswd=await bcrypt.hash(password,10);

        const account=await logincrediential.findOneAndUpdate({email},{email:email,password:pswd,isactive:true})   

        res.status(200).send("account activated")
        
    } catch (error) {
        console.log(error);
        res.status(500).send("error occured activating the account");
    }
}

export const usersignin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const loginuser=await logincrediential.findOne({email});

        if(!loginuser){
            return res.status(401).send("invalid email");
        }

        const pswrd = await bcrypt.compare(password,loginuser.password);
        
        if(!pswrd){
            return res.status(401).send("invalid password");
        }

        if(loginuser.isactive==false){
            return res.status(401).send("activate the account first")
        }
        
        res.status(200).json({loginuser})
        
    } catch (error) {
        console.log(error);
        res.status(500).send("error occured while sigining in");
        
    }
}

//forget password

export const forgetpassword=async (req,res)=>{
    const {email}=req.body;

    const user = await logincrediential.findOne({email});

    if(!user){
        return res.status(404).json({message:"User not found"})
      }
// token gen, 
 const tokengen = Math.floor(Math.random(10)*1000)

 // put token db add

const mail={email:user.email};
const token={resettoken:tokengen}

// const newuser=new logincrediential({username,email,password:hashpswd});
const assigntoken = await logincrediential.findOneAndUpdate(mail,token);

// link gen,

const generatedlink=`https://url-shortner-frontend-three-eta.vercel.app/reset-pswrd/${user.id}/${tokengen}`



//mail send

const info = await transporter.sendMail({
          from: process.env.PASS_EMAIL,
          to: user.email, 
          subject: "Password Reset", 
          text: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
           generatedlink
        });

        res.status(200).send("mail send successfully")

}


// hash function

const hashedpswd=async(password)=>{
    
    return await bcrypt.hash(password,15);
  
}

//reset password

export const resetpswd=async(req,res)=>{
 
  try {
    const {password}=req.body;  
    console.log(password); 

    const{id,token}=req.params;

    const resetuserpassword=await logincrediential.findOne({_id:id,resettoken:token});

   
    const hash= await hashedpswd(password)

const newpassword= await logincrediential.findOneAndUpdate(resetuserpassword,{password:hash,resettoken:" "});


    res.status(200).json("Password changed successfully")
    
  } catch (error) {
   
    res.status(500).send("error ocured while reseting password")
  }

}

