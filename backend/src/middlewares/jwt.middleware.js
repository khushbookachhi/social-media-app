import jwt from 'jsonwebtoken';


const jwtAuth=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        console.log("jwt token ",token);
        if(!token){
            return res.status(401).json({error:"UnAuthorized - No token provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_Secret);
        if(!decoded){
            return res.status(401).json({error:"UnAuthorized - Invalid Token"});  
        }
        req.userID=decoded.userID;
       
        next();
    } catch (error) {
        console.log("error in protectRoute Middleware ",error);
        res.status(500).json({error:"Internal Server Error !"});
    }
}

export default jwtAuth;