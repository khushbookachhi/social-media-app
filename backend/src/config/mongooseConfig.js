import mongoose from "mongoose";
const url=process.env.mongo_URL;

export const connectUsingMongoose=async()=>{
    try {
        await mongoose.connect(url);
        console.log("MongoDb is connected using mongoose");
    } catch (error) {
        console.log("mongoose connection error!!");
        console.log(error);
    }
}