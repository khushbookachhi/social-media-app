import React, { useContext, useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { parseISO, formatDistanceToNow } from 'date-fns';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { BiColorFill, BiCommentDetail } from "react-icons/bi";
import style from './postCard.module.css';
import useLikePost from '../../hooks/useLikePost';
import { useAuthContext } from '../../context/AuthContext';
import useComment from '../../hooks/useComment';
import useDelete from '../../hooks/useDelete';

import usePostsUpdate from '../../hooks/useUpdate';
const PostCard = ({post,mypath,setRefresh,setGetposts}) => {
const postDate = post.updatedAt;
const timeAgoText = timeAgo(postDate);
    const [showComments,setShowComments]=useState(false);
   const carouselID=`carouselExample${post._id}`;
   const{likePost,getLikes}=useLikePost();
   const {loading,commentPost,commentGet}=useComment();
   const[likes,setLikes]=useState([]);
   const[getlike,setgetlike]=useState(true);
   const [userlike,setUserLike]=useState(false);
   const [commentInput,setCommentInput]=useState("");
   const [comments,setComments]=useState([]);
   const [userComment,setUserComment]=useState(true);
   const [caption,setCaption]=useState(post.caption);
   const [files,setFiles]=useState(post.postUrls);
   const [reqfiles,setReqfile]=useState();
   const {authUser}=useAuthContext();
   const {deletePost}=useDelete();
   const {updateLoading,updatePosts,showModal}=usePostsUpdate();
   useEffect(() => {
    const fetchLikes = async () => {
        try {
            const likesData = await getLikes(post._id);
            setLikes(likesData);
            setgetlike(false);
            const isLiked = likesData.some(like => like.user._id === authUser._id);
            setUserLike(isLiked);
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    };
    if(getlike)
    fetchLikes();
}, [getlike]);
useEffect(() => {
    const fetchComments = async () => {
        try {
            const commentsData = await commentGet(post._id);
            console.log(commentsData);
            setComments(commentsData);
            setUserComment(false);
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    };
    if(userComment)
        fetchComments();
}, [userComment]);
function handleChange(e) {
    const files = e.target.files;
    
      setReqfile(files);
    // Check if any files were selected
    if (!files.length) {
      return; // Handle no files selected (optional)
    }
  
    // Handle multiple files
    const fileURLs = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i]; // Corrected typo (should be 'i')
      fileURLs.push(URL.createObjectURL(file));
    }
  
    // Update state with the array of file URLs
    setFiles(fileURLs);

}
   
    function handleShowComments(){
        setShowComments((prevState)=>!prevState);
    }
   
    function timeAgo(date) {
        return formatDistanceToNow(parseISO(date), { addSuffix: true });
    }
    useEffect(()=>{
        console.log(files);
        console.log(reqfiles);
        },[files])
    
        function handleSubmit(){
            updatePosts(post._id,reqfiles,caption,setGetposts)
                 setCaption("");
            setReqfile(null);
            setFiles([]);
        }
      
 
  return (
    <div class="card border-black mb-5" style={{"width": "30rem"}}>
        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel">{authUser.username}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="mb-1">
       
       {/* input for caption  */}
    <input type="text" className="form-control fs-6 fw-semibold" placeholder='Whats on your mind..' 
    value={caption} onChange={((e)=>setCaption(e.target.value))}/>
  </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Add more image</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">{authUser.username}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="input-group mb-3">
    
    <input type="file" class="form-control" multiple onChange={handleChange} />
  </div>
  {/* show preview img  */}
  <div className='d-flex flex-wrap align-items-center'>
          {files && files.length>0 && files.map((file,index)=>{
           
     return <img src={file} className='mx-2' key={index} alt=""  style={{"width":"10rem"}}/>
  })}
          </div>
      </div>
      <div class="modal-footer border border-0">
      <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back</button>
      <button class="btn btn-primary" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal">next</button>
      </div>
    </div>
  </div>
</div>
<div class={`modal fade`} id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border border-0">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">{authUser.username}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex flex-column flex-wrap">
          <h5>{caption}</h5>
          {/* show preview img  */}
          <div className='d-flex flex-wrap align-items-center'>
          {files && files.length>0 && files.map((file,index)=>{
            
     return <img src={file} className='mx-2' key={index} alt="file"  style={{"width":"10rem"}}/>
  })}
          </div>
  
  
        </div>
        <div class="modal-footer border border-0">
          <button class="btn btn-primary"  onClick={handleSubmit} disabled={updateLoading}
           {...(!updateLoading && { "data-bs-dismiss": "modal", "aria-label": "Close" })}>
          {updateLoading? <span className='spinner-border spinner-border-sm text-light' role="status">
    <span class="visually-hidden">Loading...</span>
  </span> : "Post"}
            </button>
        </div>
      </div>
    </div>
  </div>
 {mypath && <span class={`${style.left} position-absolute top-0 translate-middle py-1 px-2 bg-primary border border-light rounded-circle`}
 data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
 <FaPen  color='white'/> 
  </span>}
  {mypath &&  <span class="position-absolute top-0 start-100 translate-middle py-1 px-2 bg-danger border border-light rounded-circle"
  onClick={()=>{deletePost(post._id);setGetposts(prev=>!prev)}}>
    <MdDelete color='white' />
  </span>}
<div class="card-header bg-white d-flex align-items-center">
<img className='border border-1 rounded-circle' src="https://avatar.iran.liara.run/public" alt="" style={{"width": "2.5rem"}}/>  
<h5 className='mb-0 mx-2'>{post.userID.username}</h5 > 
  </div>
  <div id={carouselID} class="carousel slide">
  <div class="carousel-inner">
    {post && post.postUrls.length>0 && post.postUrls.map((url,index)=>{
        return  <div class="carousel-item active" key={index}>
        <img src={`http://localhost:4060/${url}`} class="d-block w-100" alt="..."/>
      </div>
    })}
   
   
  </div>
  {post.postUrls.length>1 &&
   <button class="carousel-control-prev" type="button" data-bs-target={`#${carouselID}`} data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  }
  
 { post.postUrls.length>1 &&  
 <button class="carousel-control-next" type="button" data-bs-target={`#${carouselID}`} data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  }
</div>
  {/* <img src={`http://localhost:4060/uploads/${}`} class="card-img-top" alt="..." style={{"width": "39.90rem","height":"30rem"}}/> */}
  <div class="card-body mt-0 mb-0">
    <div className='flex'><button className={`p-0 ${style.button}`}
    onClick={()=>{likePost(post._id);setgetlike(true);}}>
      {userlike?<GoHeartFill fontSize={"1.5rem"} color='red'/>:<GoHeart fontSize={"1.5rem"}/>}
      
            
      </button> 
    {/* <GoHeartFill fontSize={"1.5rem"} color='red'/> */}
     {/* <GoHeartFill /> */}
     <button className={`p-0 mx-2 ${style.button}`}onClick={handleShowComments}><BiCommentDetail fontSize={"1.5rem"}/></button></div>
   <p class="card-text fw-semibold fs-6 mb-0">{likes.length} likes</p>
    <p class="card-text fw-semibold fs-6">
        <span className='fw-bold fs-6'>{post.userID.username} </span>
        {post.caption}</p>
  </div>
 {showComments && <form>
    <div class="input-group rounded-pill border border-2 mb-2">
  <input type="text" class="form-control rounded-pill" placeholder="add a comment" required
  value={commentInput} onChange={(e)=>{setCommentInput(e.target.value)}}/>
</div>
{commentInput && <button className='btn btn-primary py-0 px-1 mx-2'
onClick={()=>{commentPost(post._id,commentInput);setUserComment(true);}} disabled={loading}>
     {loading? <span className='spinner-border spinner-border-sm text-light' role="status">
    <span class="visually-hidden">Loading...</span>
  </span> : "Post"}</button>}
    </form>}
 {showComments && <div class="mt-1">
{comments && comments.length>0 && comments.map((comment,idx)=>{
    return  <div class="card border border-bottom-0" key={idx} style={{"width": "inherit"}}>
    <div class="card-body p-2">
      <h6 className='mb-0'>{comment.userID.username}</h6>
      <p class="card-text">{comment.comment}</p>
    </div>
  </div>
})}
   

    </div>}
  <div class="card-footer border-0">
   {timeAgoText}
  </div>
  </div>
  )
}

export default PostCard