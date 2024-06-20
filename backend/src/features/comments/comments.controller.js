
import CommentRepository from "./comments.repository.js";



// creating class for handling req urls and response data 
export class CommentController{
    constructor(){
        this.commentRepository=new CommentRepository();
    }
    async add(req,res){
        try {
            const userID=req.userID;
            const postID=req.params.postID;
            const comment=req.body.comment;
        
           const newComment= await this.commentRepository.add(userID,postID,comment);
            res.status(200).json(newComment); 
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"}); 
        }
        
    }
    async get(req,res){
        try {
            const postID=req.params.postID;
           const comments= await this.commentRepository.get(postID);
            res.status(200).json(comments); 
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"}); 
        } 
    }
    
    async update(req,res){
        try {
            const id=req.params.id; 
            const comment=req.body.comment;
           const updatedComment= await this.commentRepository.update(req.userID,id,comment);
            res.status(201).send(updatedComment);
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with updating comment on post ",500) 
        }
    }
    async delete(req,res){
        try {
            const id=req.params.id; 
            // const comment=req.body.comment;
           await this.commentRepository.delete(req.userID,id);
            res.status(201).send("Comment is deleted successfully");
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with deleting comment on post ",500) 
        }
    }
}