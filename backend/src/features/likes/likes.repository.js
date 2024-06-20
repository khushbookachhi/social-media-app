import mongoose from "mongoose";
import { likeSchema } from "./likes.schema.js";


const LikeModel=mongoose.model("Like",likeSchema);
export default class LikeRepository{

    async getLikeOnPost(postID){
        try {
            const existLikes=await LikeModel.find({
             like:postID,
             
            }).lean().populate("user",'_id name email');
            console.log("total likes are:-",existLikes.length);
            return existLikes;
        } catch (error) {
            console.log(error);
         throw new Error("Something with wrong with database");  
        }
    }

    async likeOnPost(userID,postID){
        try {
            const existLike=await LikeModel.findOne({
                user:userID,
             like:postID,
             
            })
            if(existLike){
                await LikeModel.findOneAndDelete({
                    user:userID,
                    like:postID,
    
                });
            }else{
                const newLike=await LikeModel.create({
                    user:userID,
                    like:postID
                   }) 
                   await newLike.save();
            }
           
         } catch (error) {
             console.log(error);
             throw new Error("Something with wrong with database");   
         }
        }
}