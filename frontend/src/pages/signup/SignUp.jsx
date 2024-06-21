import React, { useState } from 'react'
import sideImg from '../../assets/man-women.jpg';
import style from './signup.module.css';
import useSignUp from '../../hooks/useSignUp';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [inputs,setInputs]=useState({
        email:'',username:'',password:''
    })
    const {loading,signup}=useSignUp();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        await signup(inputs);
    }
  return (
    <div className={`container my-5 d-flex justify-content-around bg-white`}>
       
       <div className={`${style.signupImg}`}>
         <img src={sideImg} alt="sideImg" />
       </div>
       <div className={`${style.signupform} py-4 px-4 d-flex flex-column align-items-center mt-4 border border-1`}>
        <h1>SignUp</h1>
        <p className={`fs-5 fw-semibold text-center text-secondary`}>Sign Up to see photos and videos from your friends</p>
        <form className={`mt-3`} onSubmit={handleSubmit}>
        <div className="mb-1">
    {/* input for email  */}
   <input type="email" className="form-control border-primary border-1"
   value={inputs.email} placeholder='email' required
   onChange={(e)=>{setInputs({...inputs,email:e.target.value})}}/>
 </div>
        <div className="mb-1">
     
      {/* input for name  */}
   <input type="text" className="form-control border-primary border-1"
   value={inputs.username} placeholder='username' required
   onChange={(e)=>{setInputs({...inputs,username:e.target.value})}}/>
 </div>
 
 <div className="mb-1">
    {/* input for password  */}
   <input type="password" className="form-control border-primary border-1"
   value={inputs.password} placeholder='password' required
   onChange={(e)=>{setInputs({...inputs,password:e.target.value})}}/>
 </div>
  {/* submit button  */}
  <button type="submit" className={` ${style.button} btn btn-primary mt-3`} disabled={loading}>
  {loading? <span className='spinner-border spinner-border-sm text-light' role="status">
    <span className="visually-hidden">Loading...</span>
  </span> : "Sign Up"}</button>
        </form>

        <div className={`mt-4 fs-6 fw-semibold`}>
            <p>Have an account ? <Link to="/login">Log in</Link></p>
        </div>
       </div>
    </div>
  )
}

export default SignUp