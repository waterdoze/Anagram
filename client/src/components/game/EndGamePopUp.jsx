import React from 'react';
import "../../css/index.css"

const EndGamePopUp = ({ score, amountGuessed, setEndGamePopUp, setStartGamePopUp, setSeconds, handleKeyUp }) => {
    return (
        <div className="PopUp">
            <h1>Game Over</h1>
            <h2>Score: {score}</h2>
            <h2>Words Guessed: {amountGuessed}</h2>
            
            <button className = "popUpButton" onClick={() => {setEndGamePopUp(false); setStartGamePopUp(true); setSeconds(5); handleKeyUp({ key: 'Enter' , endOfGame: false, resetGame: true})}}>Play Again</button> 
        </div>
    );
}

export default EndGamePopUp;