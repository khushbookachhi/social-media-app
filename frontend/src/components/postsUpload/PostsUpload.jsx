import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';
import style from './postUpload.module.css'
import usePostsUpload from '../../hooks/usePostsUpload';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useGetPosts from '../../hooks/useGetPosts';


const PostsUpload = ({setRefresh}) => {
    const [files,setFiles]=useState([]);
    const [reqfiles,setReqfile]=useState();
    const {authUser}=useAuthContext();
    const [caption,setCaption]=useState("");
    const {posts}=useGetPosts();
    const {loading,uploadPosts,showModal}=usePostsUpload();
 
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
    useEffect(()=>{
    console.log(files);
    console.log(reqfiles);
    },[files])

    function handleSubmit(){
      if(reqfiles){
        uploadPosts(reqfiles,caption,setRefresh);
      
      }

    }
    useEffect(()=>{
        setCaption("");
        setReqfile(null);
        setFiles([]);
    },[showModal])
   
  return (
    <>
    <div class={`modal fade`} id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
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
          <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Add Media</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border border-0">
           
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div class="input-group mb-3">
    
    <input type="file" class="form-control" multiple onChange={handleChange} required/>
  </div>
  {/* show preview img  */}
  <div className='d-flex flex-wrap align-items-center'>
          {files.length>0 && files.map((file,index)=>{
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
  {/* modal 3  */}
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
          {files.length>0 && files.map((file,index)=>{
     return <img src={file} className='mx-2' key={index} alt=""  style={{"width":"10rem"}}/>
  })}
          </div>
  
  
        </div>
        <div class="modal-footer border border-0">
          <button class="btn btn-primary"  onClick={handleSubmit} disabled={loading}
           {...(!loading && { "data-bs-dismiss": "modal", "aria-label": "Close" })}>
          {loading? <span className='spinner-border spinner-border-sm text-light' role="status">
    <span class="visually-hidden">Loading...</span>
  </span> : "Post"}
            </button>
        </div>
      </div>
    </div>
  </div>
  <button class={`${style.writemodal} btn bg-body-secondary text-start px-3 fs-5 fw-semibold rounded-pill`} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Start a post</button>
  </>
  )
}

export default PostsUpload