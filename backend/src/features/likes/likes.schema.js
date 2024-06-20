import mongoose from "mongoose";


export const likeSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    like:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
})