import React from 'react';
import "../css/index.css"

const EndGamePopUp = ({ highScore, setStartGamePopUp }) => {
    return (
        <div className="PopUp">
            <h1>Click to Play!</h1>
            <h2>High Score: {highScore}</h2>
            <button className = "popUpButton" onClick={() => setStartGamePopUp(false)}>Start</button>
        </div>
    );
}

export default EndGamePopUp;