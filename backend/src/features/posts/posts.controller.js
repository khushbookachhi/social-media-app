import PostRepository from "./posts.repository.js";



export class PostController{
    constructor(){
        this.postRepository=new PostRepository(); //initialize repository for calling its funcion
    }

     //adding post to db
   async addPost(req,res){
    const {caption}=req.body; //storing data from req body
    try {
        
        console.log("the req body is");
        console.log(req.body);
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
         // Create an array of file URLs
         const fileUrls = files.map(file => file.path);
       //called function to add data to db
      const newPost=await this.postRepository.addPost(req.userID,caption,fileUrls);
       res.status(201).json({newPost}); // success and sent newPost to client view
    } catch (error) {
        console.log(error); 
        res.status(500).json({error:"Internal server error"}); 
      
    }
}
  //getting all posts
  async getAllPosts(req,res){
    try {
        //handle operation to get posts
        const posts=await this.postRepository.getAllPosts();
        if(posts){
            return res.status(201).json({posts});// sent successfully all posts to client
        }else{
            return res.status(404).json({error:"Posts not found"});  
        }
    } catch (error) {
        console.log(error); 
        res.status(500).json({error:"Internal server error"}); 
    } 
}
//getting all posts of user
async getAllByUserId(req,res){
    try {
       //handle operation to get posts of user
        const posts=await this.postRepository.getAllByUserId(req.userID);
        if(posts){
            return res.status(200).json({posts}); //success and sent posts to client
        }else{
            return res.status(404).json({error:"Posts not found"});
        }
    } catch (error) {
        console.log(error); 
        res.status(500).json({error:"Internal server error"});
    }
}

  //update post 
  async update(req,res){
    try {
        const postID=req.params.postID;  //store data from req body and params
        const caption=req.body.caption;
        const userID=req.userID;
        let postUrls = [];
       
       // Check if there are files uploaded
       if (req.files && req.files.length > 0) {
        // Map through uploaded files and get their filenames
        postUrls = req.files.map(file => file.path);
    }
              
               //handle operation to update post by post iD
        const updatedPost=await this.postRepository.update(userID,postID,caption,postUrls);
       
        if(!updatedPost){
            return res.status(404).json({error:"Post not found"});// when there is no post
        }else{
            return res.status(200).json(updatedPost); //success and sent post to the client 
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"}); 
    }
}
  //delete post by postID
  async delete(req,res){
    try {
        const postID=req.params.postID; // params data
        //handle operation to delete post by post iD
        await this.postRepository.delete(postID);
        res.status(200).json({message:"post is deleted successfully!"}); //success
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"}); 
    }
}
}