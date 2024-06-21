import UserRepository from "./users.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export class UserController{
    constructor(){
        this.userRepository=new UserRepository();
    }

      // controller for sign up 
      async signUpController(req,res){
        const {username,email,password}=req.body; //storing values of req.body
        try {
            //hash password
            console.log(req.body);  
           const hashPassword=await bcrypt.hash(password,17); //bcrypt for hasing password
           //modelize req body data in user
          const newUser=await this.userRepository.signUp(username,email,hashPassword);// new user created
          if(newUser){
            res.status(201).json({
                _id:newUser._id,
                username:newUser.username,
                email:newUser.email
               });  //success and sent new user to client
          }else{
            res.status(400).json({error:"Invalid User Data !"});  
          }
          
        } catch (error) {
            console.log(error); // catched error and throw error
            res.status(500).json({error:"Internal server error"});
          
        }
       
    }
      // controller for sign in 
      async signInController(req,res){
        console.log(req.body.email,req.body.password);// email and password took from req body
          try {
             //check with email if user exist 
             const user=await this.userRepository.findByEmail(req.body.email); 
             console.log("Existing user is",user);
             if(!user){
                 res.status(400).json({error:"Incorrect credentials !"}); // when there is no user
             }else{
                 // compare password with hashed password 
                 const result=await bcrypt.compare(req.body.password,user.password);
                 console.log("result is ",result);
                 if(result){
                     // create token 
                     const token=jwt.sign({
                         userID:user._id,
                         email:user.email,
                     },
                     process.env.JWT_Secret,  //provide secret key
                     {
                         expiresIn:'4d',    //token will expire in 4 hr
                     }
                     );
                     res.cookie("jwt",token,{
                        maxAge:4 * 24 * 60 * 60 * 1000, //ms
                        httpOnly:true, // prevent xss attacks cross-site scripting attacks
                        sameSite:"none", //CSRF attacks cross-site request forgery attacks
                        secure: process.env.Node_ENV!== "development"
                    });
                     return res.status(200).json({
                        _id:user._id,
                        username:user.username,
                        email:user.email
                       });;// success and sent token for accepting all req
                 }else{
                    return res.status(400).json({error:"Incorrect credentials !"});
                 }
             }
          } catch (error) {
             console.log(error);
             return res.status(500).json({error:"Internal Server Error !"});
          }
         }
         async logoutController(req,res){
            try {
                res.cookie("jwt","",{ maxAge:0});
                res.status(200).json({message:"Logged Out Successfully !"});
            } catch (error) {
                console.log(error);
                res.status(500).json({error:"Internal server error"}); 
            }
        }
        async resetPassword(req,res){  // reset password then confirm password is your task to do
            const {email,newPassword,confirmPassword}=req.body;
            ///hash password
            try {
              if(newPassword===confirmPassword){
                const hashPassword=await bcrypt.hash(newPassword,17);
                const user=await this.userRepository.findByEmail(email); 
                if(!user){
                    res.status(400).json({error:"Register Before Signin !"}); // when there is no user
                }
                try {
                  await this.userRepository.resetPassword(user._id,hashPassword);
                  res.status(200).json({message:"Password is updated"});
                  } catch (error) {
                    console.log(error);
                    res.status(500).json({error:"Internal server error"}); 
                  }
                  
              
              }
            } catch (error) {
              res.status(400).json({error:"password is not matched !"});
            }
        }
}