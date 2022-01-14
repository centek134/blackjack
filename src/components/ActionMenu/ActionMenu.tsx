import React from 'react'
import {Hand} from "../../containers/BlackJack"
import "./ActionMenu.css";
interface PlayerActions {
    hand: Hand["card"] ;
    setHand: React.Dispatch<React.SetStateAction<Hand["card"]>>;
    setStopRound: React.Dispatch<React.SetStateAction<boolean>>
    gameReset: () => void;
    deckId:string;
}
export const ActionMenu: React.FC<PlayerActions> = ({hand, setHand, setStopRound, deckId, gameReset}) => {

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
        <section className="btn_section">
            <div className='btn_cont'>
            <button onClick={endRound}>Stand</button>
            </div>
            <div className='btn_cont'>
            <button onClick={drawCard}>Hit</button>
            <button className='btn_padding'>token count</button>
            <button onClick={gameReset}>Reset game</button>
            </div>
        </section>
        
    )
}
export default ActionMenu;