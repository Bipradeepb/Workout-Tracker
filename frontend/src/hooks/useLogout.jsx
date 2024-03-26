
import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = (props) => {

    const {dispatch}=useAuthContext();
    const {dispatch:workoutDispatch}=useWorkoutContext();

    const logout=async()=>{

        //remove the user data from local storage
        localStorage.removeItem('user');

        //change the user state globally
        dispatch({type:'LOGOUT'});

        //remove all workouts from the global state
        workoutDispatch({type:'SET_WORKOUTS',payload:null});
    }

    return {logout};
};

