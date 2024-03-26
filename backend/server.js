
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Routes/userRoutes.js";
import bodyParser from "body-parser";
import authrouter from "./Routes/authRoutes.js";

const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/workouts",router);
app.use("/user",authrouter);

//CONNECT to DATABASE

const connectDB=async()=>{

    try {

        const resp=await mongoose.connect("mongodb://127.0.0.1:27017/Workout-tracker");
        console.log("Connected successfully.");

    } catch (error) {

        console.log(error);
    }
};

connectDB();

app.listen(process.env.PORT||8000,(err)=>{

    if(err)
    {
        console.log(err);
    }

    console.log("Server is listening at port",process.env.PORT);
});