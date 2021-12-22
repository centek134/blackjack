import React, {useEffect} from 'react'
import { Hand } from "../containers/BlackJack"
import Points from "./Points";
export interface Iprops {
    deckId: string;
    hand: Hand["card"];
    setHand:React.Dispatch<React.SetStateAction<Hand["card"]>>;
    playerPoints: number;
    setPlayerPoints:React.Dispatch<React.SetStateAction<number>>;
    
};

const Player: React.FC<Iprops> = ({deckId, hand, setHand, playerPoints ,setPlayerPoints}) => {

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
        },[deckId])

    const drawCard = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`, {
            method:"GET"
        })
        .then( response => response.json())
        .then( data => {
                console.log(data);
                setHand([...hand,{
                    code:data.cards[0].code,
                    image:data.cards[0].image,
                    suit:data.cards[0].code,
                    value:data.cards[0].code
                }])
            })
        .catch( err => console.log(err));
    }




    return (
        <div>

            {hand? hand.map((card,i) => {
                return(
                    <img key={i} alt='card' src={card.image}/>
                )
            }) : null}
            <button onClick = {drawCard} >Dobierz karte, player</button>
            <button onClick={() => console.log(hand)}>Sprawdź rękę</button>
            <Points points = {playerPoints} setPoints = {setPlayerPoints} hand = {hand}/>
           
        </div>
    )
}
export default Player;