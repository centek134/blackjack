import React, {useEffect} from 'react'
import { Hand } from '../containers/BlackJack';
import Points from "./Points";
interface Props {
    stopRound: boolean;
    deckId: string;
    houseHand: Hand["card"];
    housePoints: number;
    setHouseHand: React.Dispatch<React.SetStateAction<Hand["card"]>>;
    setHousePoints:React.Dispatch<React.SetStateAction<number>>;
}

export const House: React.FC<Props> = ({houseHand, setHouseHand, deckId, stopRound, housePoints,setHousePoints}) => {

    useEffect(() => {
        if(deckId){
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`, {
                method:"GET"
            })
            .then( response => response.json())
        .then( data => {
                console.log(data.cards);
                setHouseHand(data.cards);
            })
        .catch( err => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[deckId]);
   
         const addCards = async () => {
           await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`, {
               method:"GET"
            })
            .then( response => response.json())
            .then( data => {
                console.log(data);
                setHouseHand([...houseHand,{
                    code:data.cards[0].code,
                    image:data.cards[0].image,
                    suit:data.cards[0].code,
                    value:data.cards[0].code
                }])
            })
            .catch( err => console.log(err));  
        };
        
        useEffect(()=> {
            if( stopRound && housePoints < 18){
                addCards();
            }
            else if( stopRound && housePoints >= 19){
                console.log("house wins");
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[stopRound,housePoints])

    
    return (
        <fieldset>
            <legend>House cards</legend>
            {houseHand? houseHand.map(card => {
                return(
                    <img key={card.code} alt='card' src={card.image}/>
                )
            }) : null}
            <Points points={housePoints} setPoints={setHousePoints} hand={houseHand}/>
            <button onClick={() => console.log(houseHand)}>click to console log</button>
        </fieldset>
    )
};
export default House;