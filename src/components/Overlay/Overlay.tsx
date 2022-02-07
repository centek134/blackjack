import React from 'react';
import "./Overlay.css";
interface Props {
    winner:string,
    gameReset: () => void,
    housePoints: number,
    playerPoints:number
}
export const Overlay : React.FC<Props> = ({winner, gameReset, housePoints, playerPoints}) => {
    return (
        <div className="overlay">
            <div className="popup">
                <h2>{winner}</h2>
                <p>House points: {housePoints}</p>
                <p>Player points: {playerPoints}</p>
                <button onClick={gameReset}>Next round!</button>
            </div>
            
        </div>
    )
}
export default Overlay;
