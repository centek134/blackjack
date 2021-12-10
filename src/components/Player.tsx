import React, {useEffect} from 'react'
import { PlayerHand  as Hand} from "../containers/BlackJack"
interface Iprops {
    deckId: string,
    hand: Hand["card"],
    setHand:React.Dispatch<React.SetStateAction<Hand["card"]>>
};

const Player: React.FC<Iprops> = ({deckId, hand, setHand}) => {

        useEffect(() => {
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`, {
                method:"GET"
            })
            .then( response => response.json())
            .then( data => {
                    console.log(data.cards);
                    setHand(data.cards);
                })
            .catch( err => console.log(err));
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

            {hand.map(card => {
                return(
                    <img src={card.image}/>
                )
            })}
            <button onClick = {drawCard} >Dobierz karte, player</button>
            <button onClick={() => console.log(hand)}>Sprawdź rękę</button>
           
        </div>
    )
}
export default Player;