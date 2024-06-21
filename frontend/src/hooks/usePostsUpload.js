

import React, { useState } from 'react'
import toast from 'react-hot-toast';


const usePostsUpload = () => {
    const [loading,setLoading]=useState(false);
    const [showModal,setShowModal]=useState(true);
  
    const uploadPosts=async(files,caption,setRefresh)=>{
        console.log(files);
        const success=handleInputErrors(files)
        if(!success) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("caption", caption);
            Array.from(files).forEach((file,index) => {
            formData.append(`postUrls`, file);
            });
            const res=await fetch("/api/posts/",{
                method:"POST",
                body: formData
            })
            const data=await res.json();
            
        if(data.error){
            throw new Error(data.error);
        }else{
            toast.success("Post uploaded successfully !")
            // setTimeout(() => {
                setRefresh(prev=>!prev)
                setShowModal(false);
            // }, 1000);
           
        }
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,uploadPosts,showModal}
}

function handleInputErrors(files){
    if(!files || files.length===0){
        toast.error('Please upload atleast one post');
        return false;
    }

    return true;
}

export default usePostsUpload