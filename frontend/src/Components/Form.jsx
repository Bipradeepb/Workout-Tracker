import React, { useState } from "react";
import "./Form.css";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Form = (props) => {

    const [title,setTitle]=useState("");
    const [reps,setReps]=useState("");
    const [load,setLoad]=useState("");
    const [error,setError]=useState("");
    const [emptyFields,setEmptyFields]=useState([]);
    const [errorMessage,setErrorMessage]=useState([]);
    const {user}=useAuthContext();

    const {dispatch}=useWorkoutContext();

    async function handleSubmit(e)
    {
        e.preventDefault();

        if(!user)
        {
            setError("User needs to be logged in.");
            return;
        }

        const formbody={title,reps,load};

        const response=await fetch("http://localhost:5000/workouts",{
            method:"POST",
            body:JSON.stringify(formbody),
            headers:{
                "Content-type":"application/json",
                "Authorization":`Bearer ${user.token}`
            }
        });

        const fetchedData=await response.json();

        if(response.ok)
        {
            setTitle("");
            setReps("");
            setLoad("");
            setEmptyFields();
            setError("");
            console.log(fetchedData);

            dispatch({type:'CREATE_WORKOUT',payload:fetchedData});
        }

        if(!response.ok)
        {
            setEmptyFields(fetchedData.emptyFields);
            setErrorMessage(fetchedData.error);
            setError(fetchedData.message)
            console.log(errorMessage);
            console.log(fetchedData);
            console.log(emptyFields);
        }
    }

    return (
        <div className="form-wrapper">
            <h3 className="form-header">Add a new workout</h3>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12 setmargin">
                    <label for="title" className="form-label">Exercise Title:</label>
                    <input type="text" className={"form-control "+(emptyFields&&emptyFields.includes('title') ? "error":"")} 
                    id="title" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <label for="reps" className="form-label">Reps:</label>
                    <input type="number" className={"form-control "+(emptyFields&&emptyFields.includes('reps') ? "error":"")} 
                    id="reps" name="reps" value={reps} onChange={(e)=>{setReps(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <label for="load" className="form-label">Load(kgs):</label>
                    <input type="text" className={"form-control "+((emptyFields&&emptyFields.includes('load'))||error ? "error":"")} 
                    id="load" name="load" value={load} onChange={(e)=>{setLoad(e.target.value)}}/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary submit-button">Add Workout</button>
                </div>

                {((emptyFields&&emptyFields.length>0)||error)?
                (
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        {errorMessage}{error}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        {/* <button type="button" className="btn-close" aria-label="Close" style={{ fontSize: '0.75rem', opacity: 0.5, fontWeight: 'bold' }}></button> */}
                        {/* <button type="button" className="btn-close" aria-label="Close" style={{ float: 'right', fontSize: '21px', fontWeight: 700, lineHeight: 1, color: '#000', textShadow: '0 1px 0 #fff', filter: 'alpha(opacity = 20)', opacity: 0.2 }}></button> */}
                    </div>


                ):null}
            </form>
        </div>
    )
};

export default Form;
