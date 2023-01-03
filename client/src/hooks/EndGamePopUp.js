import React from 'react';
import "../css/index.css"

const EndGamePopUp = ({ score, amountGuessed, setEndGamePopUp }) => {
    return (
        <div className="PopUp">
            <h1>Game Over</h1>
            <h2>Score: {score}</h2>
            <h2>Words Guessed: {amountGuessed}</h2>
            
            <button className = "popUpButton" onClick={() => {setEndGamePopUp(false);}}>Play Again</button> {/*also need to reset game here on click*/}
        </div>
    );
}

export default EndGamePopUp;