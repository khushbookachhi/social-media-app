import { createContext, useContext, useState } from "react";

export const AuthContext=createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider=({children})=>{
    const storedUser = localStorage.getItem("auth-user");
   
console.log("Stored user:", storedUser);

let parsedUser = null;
if (storedUser) {
    parsedUser = JSON.parse(storedUser);
  
}

console.log("Parsed user:", parsedUser);
    const [authUser,setAuthUser]=useState(parsedUser);
    const [signedUp,setSignedUp]=useState(false);
    return <AuthContext.Provider value={{authUser,setAuthUser,signedUp,setSignedUp}}>
     {children}
    </AuthContext.Provider>
}