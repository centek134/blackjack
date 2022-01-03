import React, { useEffect } from "react";
import { Hand } from "../containers/BlackJack";
interface Cards {
  hand: Hand["card"];
  points: number;
  setPoints:React.Dispatch<React.SetStateAction<number>>;
}

export const Points: React.FC<Cards> = ({ hand, points ,  setPoints }) => {
  
  useEffect(() => {
    let points = 0;
    hand.forEach((card) => {
      let val = card.value.slice(0, 1);
      if ((val === "J" || val === "Q" || val === "K" || val === "0") || (card.value === "10")) {
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

    if(points>=21){
      gameEnd();
    }
    setPoints(points);
  
  },[hand])
  
  const gameEnd = () => {
      console.log("gameEnd");
  }

  return(
    <div>
        <h4>{points}</h4>
    </div>
  );
};
export default Points;
