import React,{ useState, useEffect} from 'react'
import Player from '../components/Player';
import House from '../components/House';
export interface Hand {
    card:{
        code:string,
        image:string,
        suit:string,
        value:string
    }[]
    };

export const BlackJack = () => {

    const [deckId, setDeckId] = useState<string>("");
    const [hand, setHand] = useState<Hand["card"]>([]);
    const [houseHand, setHouseHand] = useState<Hand["card"]>([]);
    useEffect(() => {

        const fetchAsync = async () => {

            await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", {
                method:"GET"
            })
            .then( response => response.json())
            .then( data => {
                setDeckId(data.deck_id)
                
            })
            .catch( err => console.log(err));
        }
        fetchAsync();
    },[])




    return (
        <div>
            <House houseHand = {houseHand} setHouseHand = {setHouseHand} deckId = {deckId} />
            <Player hand={hand} setHand = {setHand} deckId = {deckId}/>
        </div>
    )
}
export default BlackJack;