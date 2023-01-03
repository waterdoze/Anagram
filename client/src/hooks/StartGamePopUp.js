import React from 'react';
import "../css/index.css"

const StartGamePopUp = ({ highScore, setStartGamePopUp, setIsActive }) => {
    return (
        <div className="PopUp">
            <h1>Click to Play!</h1>
            <h2>High Score: {highScore}</h2>
            <button className = "popUpButton" onClick={() => {setStartGamePopUp(false); setIsActive(true);}}>Start</button>
        </div>
    );
}

export default StartGamePopUp;