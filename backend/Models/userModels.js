
import mongoose from "mongoose";

//CREATE A SCHEMA
const userSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true,
    },
    load:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},
{timestamps:true});


//CREATE A MODEL
const Workouts=mongoose.model("Workouts",userSchema);

export default Workouts;
