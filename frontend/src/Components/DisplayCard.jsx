import React from "react";
import Card from "./Card";
import "./DisplayCard.css";

const DisplayCard = (props) => {

  const fetchedData=props.fetchedData;

  return (
    <div className="cardContainer">
        <h3>Your recent workouts:</h3>
        {fetchedData?.map((ele)=>{
          return (
            <Card
              key={ele._id}
              id={ele._id}
              title={ele.title}
              reps={ele.reps}
              load={ele.load}
            />
          )
        })}

    </div>
  )
};

export default DisplayCard;
