import React, {useEffect} from 'react'
import { Hand } from "../../containers/BlackJack"
import Points from "../Points/Points";
import "./Player.css";
export interface Iprops {
    deckId: string;
    hand: Hand["card"];
    setHand:React.Dispatch<React.SetStateAction<Hand["card"]>>;
    playerPoints: number;
    setPlayerPoints:React.Dispatch<React.SetStateAction<number>>;
    roundCounter: number;
    
};

const Player: React.FC<Iprops> = ({deckId, hand, setHand, playerPoints ,setPlayerPoints, roundCounter}) => {

        useEffect(() => {
            if(deckId){

                fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`, {
                    method:"GET"
                })
                .then( response => response.json())
            .then( data => {
                    console.log(data.cards);
                    setHand(data.cards);
                })
            .catch( err => console.log(err));
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[deckId, roundCounter])

    return (
        <fieldset className='player-field'>
            <legend className='player-legend'>Player <Points points = {playerPoints} setPoints = {setPlayerPoints} hand = {hand}/></legend>
            {hand? hand.map((card,i) => {
                return(
                    <img className="card-img" key={i} alt='card' src={card.image}/>
                )
            }) : null}
        </fieldset>
    )
}
export default Player;