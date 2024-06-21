import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useLikePost = () => {
   
  
 const likePost=async(postId)=>{
    
      
        try {
            const res=await fetch(`/api/likes/toggle/${postId}`,{
                method:"POST",
            });
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            console.log(data);
         
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getLikes=async(postId)=>{
        
        try {
            const res=await fetch(`/api/likes/${postId}`);
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }else{
                // console.log(data);
                return data;
            }
           
          
        } catch (error) {
            toast.error(error.message);
        }
        return ;
    }
 
 return {likePost,getLikes}
}

export default useLikePost