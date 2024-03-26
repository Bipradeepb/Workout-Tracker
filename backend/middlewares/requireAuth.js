
//this middleware will basically protect the api routes
//if the user is not logged in workout apis not available for that particular user

import jwt from "jsonwebtoken";
import User from "../Models/authModels.js";

export const requireAuth=async(req,res,next)=>{

    const {authorization}=req.headers;

    //console.log(authorization)

    if(!authorization)
    {
        return res.status(401).json({error:"Authorization required"});
    }

    const token=authorization.split(" ")[1];
    //split into Bearer token-> and grab the token part

    try{

        const {_id}=jwt.verify(token,process.env.SECRET);

        req.user=await User.findOne({_id}).select('_id');
        next();

        //now all further controllers can access the unique user id for each workout document

    }catch(error){

        console.log(error);
        res.status(401).json({error:"Request is not authorized."});
    }
}