import mongoose from "mongoose";
import { userSchema } from "./users.schema.js";


//creating model from schema
const UserModel=mongoose.model('User',userSchema);

export default class UserRepository{
    async signUp(username,email,hashPassword){
        try {
            //create instance of model
            const newUser=new UserModel({username,email,password:hashPassword});
            console.log(newUser);
            
          return  await newUser.save(); //save new user
           
        } catch (error) {
            console.log(error);
            //errors related to mongoose or database
            if(error instanceof mongoose.Error.ValidationError){
                throw new Error("incorrect credential provide valid data");
            }else{
                throw new Error("Something went wrong with database");
            }
        }
    }
     // handling sign in operation 
     async findByEmail(email){
        try {
            return await UserModel.findOne({email}); //check if user exists
        } catch (err) {
            console.log(err);
            throw new Error("Something went wrong with database ");
        }
    }
    async resetPassword(userID,hashedPassword){
        try {
            let user=await UserModel.findById(userID);
            if(user){
                user.password=hashedPassword;
                user.save();   //update and save 
            }else{
                throw new Error("No such user found");
            }
           
        } catch (error) {
            console.log(error);
          throw new Error("Something went wrong with database");
           
        }
    }
}