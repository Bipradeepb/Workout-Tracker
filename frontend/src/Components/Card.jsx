import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Card = (props) => {

  const navigate=useNavigate();

  const {dispatch}=useWorkoutContext();
  const {user}=useAuthContext();

  async function handleDelete(e){

    if(!user)
    {
      return;
    }

    const response=await fetch(`http://localhost:5000/workouts/${props.id}`,{
      method:"DELETE",
      headers:{
        "Authorization":`Bearer ${user.token}`
      }
    });

    const fetchedData=await response.json();

    if(response.ok)
    {
      console.log(fetchedData);

      dispatch({type:'DELETE_WORKOUT',payload:fetchedData});
    }
  }

  function handleClick(e)
  {
    navigate(`/update/${props.id}`);
  }

  return (
    <div>
      <div className="card card-css">
            <div className="card-body">
                <div className="cardHeader">
                    <h5 className="card-title">{props.title}</h5>
                    <i className="fa-solid fa-trash" onClick={handleDelete}></i>
                </div>
                {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
                <p className="card-text"><strong>Reps:</strong>{props.reps}</p>
                <p className="card-text"><strong>Load(kgs):</strong>{props.load}</p>
                <button className="btn btn-primary submit-button-card" onClick={handleClick}>Update</button>
            </div>
        </div>
    </div>
  )
};

export default Card;
