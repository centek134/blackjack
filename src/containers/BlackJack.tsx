import React,{ useState, useEffect} from 'react'
import Player from '../components/Player/Player';
import House from '../components/House/House';
import ActionMenu from '../components/ActionMenu/ActionMenu';
import Overlay from '../components/Overlay/Overlay';
import "./BlackJack.css";
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
    const [winner, setWinner] = useState<string>("");
    const [roundCounter, setRoundCounter] = useState<number>(1);

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
        if(playerPoints > 21 || housePoints > 21 || (housePoints >= playerPoints && stopRound)){
            setStopRound(true);
            comparePoints();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[playerPoints,housePoints]);

    const comparePoints = () => {
        if(
        (housePoints > playerPoints && housePoints <= 21) ||
        (playerPoints > 21) ){
            setWinner("The winner is House!");
        }
        else if(housePoints === playerPoints){
            setWinner("Tie!")
        }
        else{
            setWinner("The winner is Player!");
        };
    };

    const gameReset = () => {
        if(stopRound){
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/return/`, {
                method:"GET"
            })
            .then( response => response.json())
            .then( data => {
                console.log(data);
            })
            .catch( err => console.log(err));

            setHand([]);
            setHouseHand([]);
            setStopRound(false);
            setRoundCounter(roundCounter + 1);
        };
    };
    
    return (
        <div className="board">
            {stopRound? <Overlay playerPoints = {playerPoints} housePoints = {housePoints} gameReset={gameReset} winner = {winner}/> : null}
            <House roundCounter={roundCounter} playerPoints = {playerPoints} stopRound = {stopRound} housePoints={housePoints} setHousePoints = {setHousePoints} houseHand = {houseHand} setHouseHand = {setHouseHand} deckId = {deckId} />
            <Player roundCounter = {roundCounter} playerPoints={playerPoints} setPlayerPoints={setPlayerPoints} hand={hand} setHand = {setHand} deckId = {deckId}/>
            <ActionMenu gameReset = {gameReset} setStopRound = {setStopRound} hand={hand} setHand={setHand} deckId={deckId}/>
        </div>
    )
}
export default BlackJack;