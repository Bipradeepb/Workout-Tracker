import React from "react";
import "./Home.css";
import Form from "../Components/Form.jsx";
import DisplayCard from "../Components/DisplayCard.jsx";
import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const Home = (props) => {

  const {workouts,dispatch}=useWorkoutContext();
  const {user}=useAuthContext();

  useEffect(()=>{

    const fetchAllWorkouts=async()=>{

      console.log(user);

      const response=await fetch("http://localhost:5000/workouts",{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${user.token}`
        }
      });
  
      const fetchedData=await response.json();
  
      if(response.ok)
      {
        dispatch({type:'SET_WORKOUTS',payload: fetchedData});
      }
    }

    //if user is logged in only then
    console.log(user)
    if(user)
    {
      fetchAllWorkouts();
    }

  },[dispatch,user]);



  return (
    <div className="main-container bg-body-tertiary">
      <DisplayCard
        fetchedData={workouts}
      />
      <Form/>
    </div>
  )
};

export default Home;
