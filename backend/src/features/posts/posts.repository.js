import mongoose from "mongoose";
import { postSchema } from "./posts.schema.js";


//creating model from schema
const PostModel=mongoose.model('Post',postSchema);

export default class PostRepository{

     //creating new post 
     async addPost(userID,caption,postUrls){
        try {
            //new post is created
            const newPost=await PostModel.create({
            userID,
            caption,
            postUrls
        });
            console.log(newPost);
            
          return  await newPost.save(); //saved newpost
           
        } catch (error) {
            console.log(error);
                throw new Error("Something went wrong with database");
            
        }
    }
     //get all posts
     async getAllPosts(){
        try {
            //finding post and populate with userID selected data
            const posts=await PostModel.find().lean().populate("userID",'_id username email');
            console.log("these are posts",posts);
            return posts;
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong with database "); 
        }
    }
    // get all posts of users by userID
    async getAllByUserId(userID){
        try {
            //finding post with userID and populate with userID selected data
            const posts=await PostModel.find({
                userID:userID
            }).populate("userID",'_id username email');
            console.log("these are posts",posts);
            return posts;
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong with database "); 
        }
    }
    async  update(userID,postID, caption, postUrls) {
        try {
            
            const updateFields = {};

            // Add fields to update based on conditions
            if (caption) {
                updateFields.caption = caption;
            }
            if (postUrls && postUrls.length > 0) {
                updateFields.$push = { postUrls: { $each: postUrls } };
            }

            const updatedPost = await PostModel.findOneAndUpdate(
                { _id: postID, userID }, // Filter by both postID and userID
                updateFields,
                { new: true } // To return the updated document
            );
            if (!updatedPost) {
                throw new Error('Post not found');
            }

            return updatedPost;
        } catch (error) {
            console.log(error);
            throw new Error(`Error updating post: ${error.message}`);
        }
    }
    async delete(postID){
        try {
            await PostModel.findOneAndDelete(
             {_id:postID});  //mongoose.Types.ObjectId
            
         } catch (error) {
             console.log(error);
             throw new Error(`Error deleting post: ${error.message}`);
         }
    }
    async getById(postID){
        try {
            const post= await PostModel.find(
             {_id:postID});  //mongoose.Types.ObjectId
             return post;
         } catch (error) {
             console.log(error);
             throw new Error(`Error getting post: ${error.message}`);
         }
        }
}