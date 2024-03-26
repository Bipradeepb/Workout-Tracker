import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Update.css";
import { useAuthContext } from "../hooks/useAuthContext";

const Update = (props) => {

    const {id}=useParams();
    const [title,setTitle]=useState("");
    const [reps,setReps]=useState("");
    const [load,setLoad]=useState("");
    const [error,setError]=useState(null);
    const {user}=useAuthContext();
    const navigate=useNavigate();
    

    const getuniqueUser=async()=>{

        const response=await fetch(`http://localhost:5000/workouts/${id}`,{
            method:"GET"
        });

        const uniqueUser=await response.json();

        if(response.ok)
        {
            console.log(uniqueUser);
            setTitle(uniqueUser.title);
            setReps(uniqueUser.reps);
            setLoad(uniqueUser.load);
        }        
    };


    useEffect(()=>{

        if(user)
        {
            getuniqueUser();
        }
    
    },[]);
    
    async function handleUpdate(e)
    {
        e.preventDefault();

        if(!user)
        {
            setError("User needs to be logged in.");
            return;
        }

        const formdata={title,reps,load};

        const response=await fetch(`http://localhost:5000/workouts/${id}`,{
            method:"PATCH",
            body:JSON.stringify(formdata),
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${user.token}`
            }
        });

        const fetchedData=await response.json();

        if(response.ok)
        {
            console.log(fetchedData);
            navigate('/home');
        }
    }

    return (
        <div className="form-update form-wrapper">
            <h3 className="form-header form-header-update">Update workout</h3>
            <form className="row g-3">
                <div className="col-12 setmargin">
                    <label for="title" className="form-label">Exercise Title:</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <label for="reps" className="form-label">Reps:</label>
                    <input type="number" className="form-control" id="reps" value={reps} onChange={(e)=>{setReps(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <label for="load" className="form-label">Load:</label>
                    <input type="text" className="form-control" id="load" value={load} onChange={(e)=>{setLoad(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary submit-button" onClick={handleUpdate}>Update Workout </button>
                </div>

                {error&&(
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}
            </form>
        </div>
    )
};

export default Update;
