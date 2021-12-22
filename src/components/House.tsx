import React, {useEffect} from 'react'
import { Hand } from '../containers/BlackJack';
import Points from "./Points";
interface Props {
    deckId: string;
    houseHand: Hand["card"];
    housePoints: number;
    setHouseHand: React.Dispatch<React.SetStateAction<Hand["card"]>>;
    setHousePoints:React.Dispatch<React.SetStateAction<number>>;
}

export const House: React.FC<Props> = ({houseHand, setHouseHand, deckId, housePoints,setHousePoints}) => {
    useEffect(() => {
        if(deckId){

            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`, {
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
    },[deckId])
    return (
        <fieldset>
            <legend>House cards</legend>
            {houseHand? houseHand.map(card => {
                return(
                    <img key={card.code} alt='card' src={card.image}/>
                )
            }) : null}
            <Points points={housePoints} setPoints={setHousePoints} hand={houseHand}/>
        </fieldset>
    )
};
export default House;