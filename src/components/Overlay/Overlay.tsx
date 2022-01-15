import React from 'react';
import "./Overlay.css";
interface Props {
    winner:string,
    gameReset: () => void
}
export const Overlay : React.FC<Props> = ({winner, gameReset}) => {
    return (
        <div className="overlay">
            <div className="popup">
                <h2>{winner}</h2>
                <button onClick={gameReset}>Next round!</button>
            </div>
            
        </div>
    )
}
export default Overlay;
