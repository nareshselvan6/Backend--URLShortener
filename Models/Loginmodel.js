import mongoose from "mongoose";

const logindetails=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isactive:Boolean,
    resettoken:String

})
const logincrediential=mongoose.model('logincrediential',logindetails);
export default logincrediential;