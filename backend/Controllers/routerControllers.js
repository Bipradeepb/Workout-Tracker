import express from "express";
import Workouts from "../Models/userModels.js";
import mongoose from "mongoose";


//function to get all data
async function getAllData(req,res)
{
    try {
        //sort userData according to recently updated
        const user_id=req.user._id;

        const userData=await Workouts.find({user_id}).sort({createdAt:-1});
        console.log(userData);

        res.status(200).json(userData);

    } catch (error) {
        
        console.log(error);
        res.status(404).json(error);
    }
}

//function to getunique data
async function getUnique(req,res)
{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"Invalid id!"});
    }

    try {
        //sort userData according to recently updated
        const userData=await Workouts.findById({_id:id});

        if(!userData)
        {
            return res.status(404).json({error:"No such workout"});
        }
        console.log(userData);

        res.status(200).json(userData);

    } catch (error) {
        
        console.log(error);
        res.status(404).json(error);
    }
}

//function to create a new data document 
async function postData(req,res)
{

    let emptyFields=[];

    if(!req.body["title"])
    {
        emptyFields.push('title');
    }

    if(!req.body["reps"])
    {
        emptyFields.push('reps');
    }

    if(!req.body["load"])
    {
        emptyFields.push('load');
    }

    if(emptyFields.length>0)
    {
        return res.status(400).json({error:"Please fill out all the fields.",emptyFields});
    }

    try {

        const workoutCreated=await Workouts.create({
            title:req.body["title"],
            reps:req.body["reps"],
            load:req.body["load"],
            user_id:req.user._id
        });

        console.log(workoutCreated);

        res.status(201).json(workoutCreated);

    } catch (error) {
        
        console.log(error);
        res.status(404).json(error);
    }
}

//function to delete a certain data
async function deleteData(req,res)
{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"Invalid id!"});
    }

    try {

        const workoutDeleted=await Workouts.findByIdAndDelete({_id:id});

        if(!workoutDeleted)
        {
            return res.status(404).json({error:"No such workout"});
        }

        console.log(workoutDeleted);

        res.status(200).json(workoutDeleted);

    } catch (error) {
        
        console.log(error);
        res.status(404).json(error);
    }
}

//function to update a certain data
async function updateData(req,res)
{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"Invalid id!"});
    }
    
    const {title,reps,load}=req.body;

    const updateFields = {};
    if (title !== "") {
        updateFields.title = title;
    }
    if (reps !== "") {
        updateFields.reps = reps;
    }
    if (load !== "") {
        updateFields.load = load;
    }

    try {

        const workoutUpdated=await Workouts.findByIdAndUpdate({_id:id},updateFields,{new:true});

        if(!workoutUpdated)
        {
            return res.status(404).json({error:"No such workout"});
        }


        console.log(workoutUpdated);
        res.status(200).json(workoutUpdated);

    } catch (error) {
        
        console.log(error);
        res.status(404).json(error);
    }
}

export {getAllData,postData,deleteData,updateData,getUnique};