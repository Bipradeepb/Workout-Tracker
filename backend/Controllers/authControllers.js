import express from "express";
import mongoose from "mongoose";
import User from "../Models/authModels.js";
import validator from "validator";
import jwt from "jsonwebtoken";


const loginUser=async(req,res)=>{

    const {email,password}=req.body;

    try
    {
        if(!email||!password)
        {
            throw Error("All fields must be filled");
        }
        //hit up the login static method
        const user=await User.login(email,password);

        //if ok try to create a jwt token
        const createToken= (_id)=>{
            
            return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'});
        }

        const token=createToken(user._id);

        //send a valid response back 
        console.log(user);
        res.status(200).json({email,token});

    }catch(error){

        res.status(400).json({error:error.message});
    }
}



const signupUser=async(req,res)=>{

    const {email,password}=req.body;

    try
    {
        if(!email||!password)
        {
            throw Error("All fields must be filled");
        }

        if(!validator.isEmail(email))
        {
            throw Error("Not a valid email.");
        }

        if(!validator.isStrongPassword(password))
        {
            throw Error("Not a strong password. Must contain atleast one uppercase, lowercase and special character.");
        }


        const user=await User.signup(email,password);

        //if ok try to create a jwt token

        const createToken= (_id)=>{
            
            return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'});
        }

        const token=createToken(user._id);

        //send a valid response back 
        console.log(user);
        res.status(200).json({email,token});

    }catch(error){

        res.status(400).json({error:error.message});
    }
}


export {loginUser,signupUser};

