import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { baseUrl } from '../api';

const useDelete = () => {
    const [loading,setLoading]=useState(false);
    const deletePost=async(postID)=>{
        setLoading(true);
        try {
            const res=await fetch(`${baseUrl}/api/posts/${postID}`,{
                method:"DELETE"
            });
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }else{
                toast.success("post deleted successfully")
            }
            console.log(data);
           
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {deletePost}
}

export default useDelete