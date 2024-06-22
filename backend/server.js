import '../env.js';
import express from 'express';
import cors from 'cors';
// import mongoose from 'mongoose';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import userRouter from './src/features/users/users.routes.js';
import postRouter from './src/features/posts/posts.routes.js';
import cookieParser from 'cookie-parser';
import likeRouter from './src/features/likes/likes.routes.js';
import commentRouter from './src/features/comments/comments.routes.js';


const server=express();
const port=process.env.PORT;
var corsOptions = {
    origin: "https://hilarious-platypus-2a1078.netlify.app",
    credentials: true
  }
  server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());
server.use(express.static('backend/uploads'));

//for all requests related to user,redirect to user routes
server.use('/api/users',userRouter);
//for all requests related to post,redirect to post routes
server.use('/api/posts',postRouter);
//for all requests related to like on post,redirect to post routes
server.use('/api/likes',likeRouter);
//for all requests related to comment on post,redirect to post routes
server.use('/api/comments',commentRouter);





//specific port
server.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
    //connection to mongoDB
    connectUsingMongoose();
})