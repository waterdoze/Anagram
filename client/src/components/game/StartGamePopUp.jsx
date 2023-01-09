import React from 'react';
import "../../css/index.css"

const StartGamePopUp = ({ highScore, setStartGamePopUp, setIsActive, setChooseLetters }) => {
    return (
        <div className="PopUp">
            <h1>Click to Play!</h1>
            <h2>High Score: {highScore}</h2>
            <button className = "popUpButton" onClick={() => {setStartGamePopUp(false); setIsActive(true); setChooseLetters(true);}}>Start</button>
        </div>
    );
}

export default StartGamePopUp;