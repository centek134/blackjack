import React,{ useState, useEffect} from 'react'
import Player from '../components/Player';
import House from '../components/House';
export interface PlayerHand {
    card:{
        code:string,
        image:string,
        suit:string,
        value:string
    }[]
    };

export const BlackJack = () => {

    const [deckId, setDeckId] = useState<string>("");
    const [hand, setHand] = useState<PlayerHand["card"]>([]);
    useEffect(() => {
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", {
            method:"GET"
        })
        .then( response => response.json())
        .then( data => {
            setDeckId(data.deck_id)

        })
        .catch( err => console.log(err));
    },[])




    return (
        <div>
            <House/>
            <Player hand={hand} setHand = {setHand} deckId = {deckId}/>
        </div>
    )
}
export default BlackJack;