import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_Password } from "./config.js";
export const userAuth = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token as string,JWT_Password);
    if(decoded){
        //@ts-ignore
        req.userid = decoded.id;
        console.log("UserId Being Assigned")
        next();
    }else{
        res.status(404).json({
            message:"You are not logged in"
        })
    }
}