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
    const [stopRound, setStopRound] = useState<boolean>(false);
    const [playerPoints,setPlayerPoints] = useState<number>(0);
    const [housePoints, setHousePoints] = useState<number>(0);


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
    },[]);

    useEffect(() => {
        if(playerPoints > 21 || housePoints > 21){
            setStopRound(true);
        }
    },[playerPoints,housePoints])




    return (
        <div>
            {stopRound? <h1>End of round!</h1>: null}
            <House housePoints={housePoints} setHousePoints = {setHousePoints} houseHand = {houseHand} setHouseHand = {setHouseHand} deckId = {deckId} />
            <Player playerPoints={playerPoints} setPlayerPoints={setPlayerPoints} hand={hand} setHand = {setHand} deckId = {deckId}/>
        </div>
    )
}
export default BlackJack;