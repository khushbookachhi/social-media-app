import express from 'express';
import { UserController } from './users.controller.js';

//get router initialize 
const userRouter=express.Router();
const userController=new UserController;

//all the path to controller methods
userRouter.post('/signup',(req,res)=>{
    userController.signUpController(req,res);
});
userRouter.post('/signin',(req,res)=>{
    userController.signInController(req,res);
});
userRouter.post("/logout",(req,res)=>{
    userController.logoutController(req,res);
});
userRouter.put("/resetPassword",(req,res)=>{
    userController.resetPassword(req,res);
});

export default userRouter;