import React, { useState, useEffect } from "react";
import { Hand } from "../containers/BlackJack";
interface Cards {
  hand: Hand["card"];
}

export const Points: React.FC<Cards> = ({ hand }) => {
  const [points, setPoints] = useState<number>(0);


  useEffect(() => {
    let points = 0;
    hand.forEach((card) => {
      let val = card.value.slice(0, 1);
      if (val === "J" || val === "Q" || val === "K" || val === "0") {
        points += 10;
      } 
      else if( val === "A"){
          if(points <= 10){
            points+=11;
          }
          else if( points > 10){
            points+=1;
          }
      }
      else {
        points += parseInt(val);
      }
    });
    setPoints(points);
  },[hand])

  return(
    <div>
        <h4>{points}</h4>
    </div>
  );
};
export default Points;
