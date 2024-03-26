
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";


export const useSignUp = (props) => {

    const {dispatch}=useAuthContext();
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(null);

    const signup=async(email,password)=>{

        setIsLoading(true);
        //make a request to the backend to post the user for signup
        const response= await fetch("http://localhost:5000/user/signUp",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-type":"application/json"
            }            
        });

        const json=await response.json();

        console.log(json);

        if(!response.ok)
        {
            //some error has occured
            //set error
            setIsLoading(false);
            setError(json.error);
        }

        if(response.ok)
        {
            //save the user data to browser local storage
            //save as user:{data}
            localStorage.setItem('user',JSON.stringify(json)); 
            //set user state
            dispatch({type:'LOGIN',payload:json})
            setError(null);
            setIsLoading(false);
        }
    }

    return {signup,error,isLoading};
    //return relevant details for future use
};

