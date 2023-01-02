import React, { useEffect, useState } from 'react'
import useAnagram from '../hooks/useAnagram'
import Keys from './Keys'
import Scoreboard from './Scoreboard'

import Slots from './Slots'
import EndGamePopUp from '../hooks/EndGamePopUp'
import StartGamePopUp from '../hooks/StartGamePopUp'

export default function Anagram({ letterString }) {

    const [endGame, setEndGame] = useState(false);
    const [startGame, setStartGame] = useState(true);
    const duringEndGame = endGame ? " duringEndGame" : "";
    const duringStartGame = startGame ? " duringStartGame" : "";
    const letters = letterString.split("")
    const { handleKeyUp, currentWord, score, amountGuessed } = useAnagram(letters)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp])
    return (
        <div>
            <div className = {"Game" + duringEndGame + duringStartGame}>
                <Scoreboard score={score} amountGuessed={amountGuessed} />
                <Slots currentWord={currentWord} />
                <Keys keys={letters} />
                <button onClick={()=>setEndGame(true)} className = {duringEndGame}>Pop Up Test</button>
            </div>
            <div>
                {startGame && <StartGamePopUp highScore ={0} setStartGamePopUp={setStartGame} />}
            </div>
            <div>
                {endGame && <EndGamePopUp score={score} amountGuessed={amountGuessed} setEndGamePopUp={setEndGame} />}
            </div>
        </div>
    )
}
