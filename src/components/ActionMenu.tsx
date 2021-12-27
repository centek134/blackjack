import React from 'react'
import {Hand} from "../containers/BlackJack"
interface PlayerActions {
    hand: Hand["card"] ;
    setHand: React.Dispatch<React.SetStateAction<Hand["card"]>>;
    setStopRound: React.Dispatch<React.SetStateAction<boolean>>
    deckId:string;
}
export const ActionMenu: React.FC<PlayerActions> = ({hand, setHand, setStopRound, deckId}) => {

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

    const endRound = () => {
        setStopRound(true);
    }
    return (
        <fieldset>
            <button onClick={drawCard}>Hit</button>
            <button onClick={endRound}>Stand</button>
            <button onClick={() => console.log(hand)}>Sprawdź rękę</button>
        </fieldset>
    )
}
export default ActionMenu;