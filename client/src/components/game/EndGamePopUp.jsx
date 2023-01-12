import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/index.css"

const EndGamePopUp = ({ score, amountGuessed, setEndGamePopUp, setStartGamePopUp, setSeconds, handleKeyUp }) => {

    const navigate = useNavigate();

    return (
        <div className="PopUp">
            <h1>Game Over</h1>
            <h2>Score: {score}</h2>
            <h2>Words Guessed: {amountGuessed}</h2>
            
            <button className = "popUpButton" onClick={() => {setEndGamePopUp(false); 
                setSeconds(5); 
                setStartGamePopUp(true);
                handleKeyUp({ key: 'Enter' , endOfGame: false, resetGame: true})

                navigate('/game')
                }}>Play Again</button> 
        </div>
    );
}

export default EndGamePopUp;