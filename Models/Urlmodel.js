import mongoose from "mongoose";

const urlmod=new mongoose.Schema(
    {
        shortId:{
            type:String,
            required:true,
        },
        redirectURL:{
            type:String,
            required:true,
        },
    
     visitHistory:[{timestamp:{type:Number}}],
     
     createdtime:String
},
{timestamps:true}

)
const url =mongoose.model("url",urlmod);

export default url;