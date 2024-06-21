import React, { useEffect, useState } from 'react';
import style from './post.module.css';

import { useAuthContext } from '../../context/AuthContext';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logout from '../../components/logout/Logout';
import PostsUpload from '../../components/postsUpload/PostsUpload';
import PostCard from '../../components/postCards/PostCard';
import useGetPosts from '../../hooks/useGetPosts';
import useLikePost from '../../hooks/useLikePost';

const Posts = () => {
    const {authUser}=useAuthContext();
    const [refresh, setRefresh] = useState(false); 
   const {loading,posts,getPosts}=useGetPosts();
   const [path,setpath]=useState("/");
   const location=useLocation();
  useEffect(()=>{
    if (authUser?._id) {
        getPosts();
    }
  },[refresh])
 useEffect(()=>{
setpath(location.pathname)
 },[setpath])

 
  return (
    <>
    
<div className='container-fluid mt-2 d-flex flex-column align-items-center'>
  <PostsUpload setRefresh={setRefresh}/>

{/* posts feed  */}
<div className='container mt-5 mb-5 bg-body-secondary d-flex flex-column align-items-center'>
    {posts.length>0 && posts.map((post,index)=>{
        return <PostCard key={index} post={post} setRefresh={setRefresh}/>
    })}


 
</div>

</div>
    {/* container-fluid   */}


    </>
  )
}

export default Posts