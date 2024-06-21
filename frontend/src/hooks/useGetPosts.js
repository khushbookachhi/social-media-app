import React, { useState } from 'react'

import toast from 'react-hot-toast';
import { baseUrl } from '../api';

const useGetPosts = () => {
    const [loading,setLoading]=useState(false);
    const [posts,setPosts]=useState([]);
   
   
        const getPosts=async()=>{
            setLoading(true);
            try {
                const res=await fetch(`${baseUrl}/api/posts/all`);
                const data=await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                console.log(data);
                setPosts(data.posts);
            } catch (error) {
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }
        const getPostsByUser=async()=>{
            setLoading(true);
            try {
                const res=await fetch(`${baseUrl}/api/posts`);
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
            return;
        }
        return {loading,posts,getPosts,getPostsByUser};
    }



   


export default useGetPosts