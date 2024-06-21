import React, { useEffect, useState } from 'react'
import useGetPosts from '../../hooks/useGetPosts';
import PostCard from '../../components/postCards/PostCard';
import { useLocation } from 'react-router-dom';


const Myposts = () => {
    const [userPosts,setUserPosts]=useState([]);
    const [getposts,setGetposts]=useState(true);
    const {getPostsByUser}=useGetPosts();
    const location=useLocation();
    const [path,setpath]=useState("/");

    useEffect(()=>{
        setpath(location.pathname)
         },[setpath])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPostsByUser();
               
               setUserPosts(postsData.posts)
            //    setGetposts(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
       
            fetchPosts();
    }, [getposts]);
  return (
    <div className='container-fluid mt-2 d-flex flex-column align-items-center'>
    {/* <PostsUpload setRefresh={setRefresh}/> */}
  
  {/* posts feed  */}
  <div className='container mt-5 mb-5 py-4 bg-body-secondary d-flex flex-column align-items-center'>
    
      {userPosts && userPosts.length>0 && userPosts.map((post,index)=>{
          return <PostCard key={index} post={post} mypath={path} setGetposts={setGetposts}/>
      })}
  
  
   
  </div>
  
  </div>
  )
}

export default Myposts