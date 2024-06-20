//import express
import express from 'express';
import { CommentController } from './comments.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';


//get router initialize 
const commentRouter=express.Router();
const commentController=new CommentController;

//all the path to controller methods
commentRouter.post('/:postID',jwtAuth,(req,res)=>{
    commentController.add(req,res);
})
commentRouter.get('/:postID',jwtAuth,(req,res)=>{
    commentController.get(req,res);
})

commentRouter.delete('/:id',jwtAuth,(req,res)=>{
    commentController.delete(req,res);
})


export default commentRouter;