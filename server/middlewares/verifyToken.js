import jwt from 'jsonwebtoken'
import CustomError from '../utils/CustomError.js'

export const verifyToken=(req,res,next)=>{
    try{
        const authHeader=req.headers.token
        if(authHeader){
            const token=authHeader.split(" ")[1]
            jwt.verify(token,process.env.JWT_TOKEN,(err,user)=>{
                if(err){
                    throw new CustomError("Token is not valid",403)
                }
                req.user=user
                next()
            })
        }else{
            throw new CustomError("You are not authenticated",403)
        }
    }catch(err){
        next(err)
    }
}