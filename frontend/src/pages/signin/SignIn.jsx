import React, { useState } from 'react'
import sideImg from '../../assets/man-women.jpg';
import style from './signin.module.css';
import { Link } from 'react-router-dom';
import useSignin from '../../hooks/useSignin';

const SignIn = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {loading,signin}=useSignin();

    const handleSubmit=async (e)=>{
        e.preventDefault();
     await signin(email,password);
    }
  return (
    <div className={`container my-5 d-flex justify-content-around bg-white`}>
       
       <div className={`${style.signupImg}`}>
         <img src={sideImg} alt="sideImg" />
       </div>
       <div className={`${style.signupform} py-4 px-4 d-flex flex-column align-items-center mt-4 border border-1`}>
        <h1>Login</h1>
       
        <form className={`mt-3`} onSubmit={handleSubmit}>
        <div className="mb-1">
    {/* input for email  */}
   <input type="email" className="form-control border-primary border-1" placeholder='email' required
   value={email} onChange={((e)=>setEmail(e.target.value))}/>
 </div>
 
 <div className="mb-1">
    {/* input for password  */}
   <input type="password" className="form-control border-primary border-1" placeholder='password' required
     value={password} onChange={((e)=>setPassword(e.target.value))}/>
 </div>
  {/* submit button  */}
  <button type="submit" className={` ${style.button} btn btn-primary mt-3`} disabled={loading}>
  {loading? <span className='spinner-border spinner-border-sm text-light' role="status">
    <span className="visually-hidden">Loading...</span>
  </span> : "Login"}
    </button>
        </form>

        <div className={`mt-4 fs-6 fw-semibold`}>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
       </div>
    </div>
  )
}

export default SignIn