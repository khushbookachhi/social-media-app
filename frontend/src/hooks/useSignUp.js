import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const useSignUp = () => {
 const [loading,setLoading]=useState(false);
 const {setAuthUser}=useAuthContext();
 const signup=async ({email,username,password})=>{
    const success=handleInputErrors({email,username,password})
    if(!success) return;
    setLoading(true);
    try {
        const res=await fetch("api/users/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,username,password})
        })
        const data=await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        localStorage.setItem("auth-user",JSON.stringify(data));
        setAuthUser(data);
        console.log(localStorage.getItem("auth-user"));
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false);
    }

 }
 return {loading,signup};

}

export default useSignUp;

function handleInputErrors({email,username,password}){
    if(!email||!username||!password){
        toast.error('Please fill all fields');
        return false;
    }
   
    if(password.length<6){
        toast.error("Password must be atleast 6 characters")
        return false;
    }

    return true;
}