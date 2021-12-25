import React from 'react'
import {Hand} from "../containers/BlackJack"
interface PlayerActions {
    hand: Hand["card"] ;
    setHand: React.Dispatch<React.SetStateAction<Hand["card"]>>;
    deckId:string;
}
export const ActionMenu: React.FC<PlayerActions> = ({hand, setHand, deckId}) => {

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
        <fieldset>
            <button onClick={drawCard}>Draw Card</button>
            <button onClick={() => console.log(hand)}>Sprawdź rękę</button>
            <button>Call</button>
            <button>Stop</button>
        </fieldset>
    )
}
export default ActionMenu;