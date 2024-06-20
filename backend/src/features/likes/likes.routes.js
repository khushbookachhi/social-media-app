
//import express
import express from 'express';
import jwtAuth from '../../middlewares/jwt.middleware.js';
import { LikeController } from './likes.controller.js';

//get router initialize 
const likeRouter=express.Router();
const likeController=new LikeController();
likeRouter.post("/toggle/:id",jwtAuth,(req,res)=>{
    likeController.toggleLike(req,res);
})
likeRouter.get("/:id",jwtAuth,(req,res)=>{
    likeController.getLike(req,res)});

export default likeRouter;