import mongoose from "mongoose";
//created postSchema and exported
export const postSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    caption:{
        type: String,
        trim: true
    },
   postUrls:{
    type:[String],
    required:true
   }
},{timestamps:true}); //createdAt and updatedAt