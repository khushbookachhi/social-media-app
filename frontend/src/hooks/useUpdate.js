

import React, { useState } from 'react'
import toast from 'react-hot-toast';


const usePostsUpdate = () => {
    const [updateLoading,setUpdateLoading]=useState(false);
    const [showModal,setShowModal]=useState(true);
  
    const updatePosts=async(postId,files,caption,setGetposts)=>{
        console.log(files);
       
        setUpdateLoading(true);
        try {
            const formData = new FormData();
            formData.append("caption", caption);
            if(files && files.length>0){
                Array.from(files).forEach((file,index) => {
                    formData.append(`postUrls`, file);
                    });
            }
            
            const res=await fetch(`/api/posts/${postId}`,{
                method:"PUT",
                body: formData
            })
            const data=await res.json();
            
        if(data.error){
            throw new Error(data.error);
        }else{
            toast.success("Post updated successfully !")
            // setTimeout(() => {
                setGetposts(prev=>!prev)
                setShowModal(false);
            // }, 1000);
           
        }
        } catch (error) {
            toast.error(error.message);
        }finally{
            setUpdateLoading(false);
        }
    }
    return {updateLoading,updatePosts,showModal}
}



export default usePostsUpdate