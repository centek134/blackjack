import React,{ useState, useEffect} from 'react'

export const BlackJack = () => {

    const [deckId, setDeckId] = useState<string>("");
    const [hand, setHand] = useState<{}[]>([]);

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


    const drawCard = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`, {
            method:"GET"
        })
        .then( response => response.json())
        .then( data => {
                console.log(data);
                let temp:{}[];
                temp = [...hand,...data.cards] 
                setHand(temp);
                
            })
        .catch( err => console.log(err));
        
    }
    return (
        <div>
            <button onClick={drawCard}>draw</button>
            <button onClick={() => console.log(hand)}>console</button>
        </div>
    )
}
export default BlackJack;