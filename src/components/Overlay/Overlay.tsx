import React, { useEffect } from 'react';
import "./Overlay.css";
interface Props {
    winner:string,
    gameReset: () => void,
    housePoints: number,
    playerPoints:number
}
export const Overlay : React.FC<Props> = ({winner, gameReset, housePoints, playerPoints}) => {

    useEffect (() => {
        document.getElementById("pop")?.scrollIntoView();
    },[])

    return (
        <div className="overlay">
            <div id='pop' className="popup">
                <h2>Verdict: {winner}</h2>
                <p>House points: {housePoints}</p>
                <p>Player points: {playerPoints}</p>
                <button onClick={gameReset}>Next round!</button>
            </div>
            
        </div>
    )
}
export default Overlay;
