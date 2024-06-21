import {useState} from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';
import { baseUrl } from '../api.js';


const useSignin = () => {
  const [loading,setLoading]=useState(false);
  const {setAuthUser}=useAuthContext();

  const signin=async(email,password)=>{
    const success=handleInputErrors({email,password})
    if(!success) return;
    setLoading(true);
    try {
        const res=await fetch(`${baseUrl}/api/users/signin`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password}),
            credentials: "include"
        })
        const data=await res.json();
     
        if(data.error){
            throw new Error(data.error);
        }
        localStorage.setItem('auth-user',JSON.stringify(data));
        setAuthUser(data);
      
    } catch (error) {
    toast.error(error.message);
    }finally{
        setLoading(false);
    }
  }
  return {loading,signin};
}

export default useSignin;

function handleInputErrors({email,password}){
    if(!email||!password){
        toast.error('Please fill all fields');
        return false;
    }

    if(password.length<6){
        toast.error("Password must be atleast 6 characters")
        return false;
    }

    return true;
}