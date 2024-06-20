import PostRepository from "../posts/posts.repository.js";
import LikeRepository from "./likes.repository.js";



export class LikeController{
    constructor(){
        this.likeRepository=new LikeRepository();
        this.postRepository=new PostRepository();
       
    }
    async getLike(req,res){
        try {
            const id=req.params.id; 
            const post=await this.postRepository.getById(id);
            if(post){
               const postLikes= await this.likeRepository.getLikeOnPost(id);
               res.status(200).send(postLikes);
            }else{
                res.status(404).send("post not found !");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"}); 
        }
    }
    async toggleLike(req,res){
        try {
            const id=req.params.id;
            console.log("this is toggleLike function is called");
            console.log("the userID is ",req.userID);
            // check if id is post or comment 
            const post=await this.postRepository.getById(id);
          
            if(post){
             await this.likeRepository.likeOnPost(req.userID,id);
             res.status(200).json({message:"Post is liked successfully"});
            }else{
                res.status(400).json({error:"Post not found !"});
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"}); 
        }
    }
}