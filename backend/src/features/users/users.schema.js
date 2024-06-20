import mongoose from "mongoose";
//created userSchema and exported
export const userSchema=new mongoose.Schema({
    username:{
        type:String,
        maxlength:[25,"Name can't be greater than 25 chracters"], // if error
        required:true
        },
    email:{
        type:String,
        unique:true,
        required:true,
        match:[/.+\@.+\../,"Please enter a valid email"] //if error
    },
    password:{
        type:String,
        required:true
    }
})