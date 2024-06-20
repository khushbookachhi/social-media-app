import express from 'express';
import { PostController } from './posts.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';
import { upload } from '../../middlewares/file-upload.middleware.js';


//get router initialize 
const postRouter=express.Router();
const postController=new PostController;

//all the path to controller methods
postRouter.post('/',jwtAuth,upload.array('postUrls', 10),(req,res)=>{
    postController.addPost(req,res);
})
postRouter.get('/all',jwtAuth,(req,res)=>{
    postController.getAllPosts(req,res);
})
postRouter.get('/',jwtAuth,(req,res)=>{
    postController.getAllByUserId(req,res);
})
postRouter.put('/:postID',jwtAuth,upload.array('postUrls', 10),(req,res)=>{
    postController.update(req,res);
})
postRouter.delete('/:postID',jwtAuth,(req,res)=>{
    postController.delete(req,res);
})

export default postRouter;