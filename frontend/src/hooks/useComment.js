import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { baseUrl } from '../api';

const useComment = () => {
  const [loading,setLoading]=useState(false);

  const commentPost=async(postId,comment)=>{
    
    setLoading(true);
    try {
        const res=await fetch(`/api/comments/${postId}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({comment})
        });
        const data=await res.json();
        if(data.error){
            throw new Error(data.error);
        }else{
            toast.success("comment posted successfully !")
        }
        console.log(data);
     
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
}
const commentGet=async(postId)=>{
    
    setLoading(true);
    try {
        const res=await fetch(`${baseUrl}/api/comments/${postId}`);
        const data=await res.json();
        if(data.error){
            throw new Error(data.error);
        }else{
            return data;
        }
     
     
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
    return ;
}
return{loading,commentPost,commentGet}
}

export default useComment