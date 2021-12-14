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
      } else {
        points += parseInt(val);
      }
    });
    setPoints(points);
  },[hand])


  /*
   const calcPoints = (hand: Hand["card"]) => {
    let points = 0;
    hand.forEach((card) => {
      let val = card.value.slice(0, 1);
      if (val === "J" || val === "Q" || val === "K" || val === "0") {
        points += 10;
      } else if (val === "ACE") {
        points += parseInt(val);
      }
    });
    setPoints(points);
  };
calcPoints(hand);
  */

  return(
    <div>
        <h4>{points}</h4>
    </div>
  );
};
export default Points;
