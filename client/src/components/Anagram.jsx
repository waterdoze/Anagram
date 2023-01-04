import React, { useEffect, useState } from 'react'
import useAnagram from '../hooks/useAnagram'
import Keys from './Keys'
import Scoreboard from './Scoreboard'

import Slots from './Slots'
import EndGamePopUp from '../hooks/EndGamePopUp'
import StartGamePopUp from '../hooks/StartGamePopUp'
import Timer from './Timer'

export default function Anagram({ letterString }) {

    const letters = letterString.split("")
    const [endGame, setEndGame] = useState(false)
    const [startGame, setStartGame] = useState(true)
    const { handleKeyUp, currentWord, score, amountGuessed, availableLetters } = useAnagram(letters)

    ////////////amount of time allowed each game////////////
    const [seconds, setSeconds] = useState(60)
    ////////////////////////////////////////////////////////
    const [isActive, setIsActive] = useState(false)

    const duringEndGame = endGame ? " duringEndGame" : ""
    const duringStartGame = startGame ? " duringStartGame" : ""

    //TIMER LOGIC//
    useEffect(() => {

        let interval = null

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1)
            }, 1000)
        }
        else if (!isActive) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)

    }, [isActive, seconds])

    useEffect(() => {

        if (seconds === 0) {
            //stimuate enter was pressed
            handleKeyUp({ key: 'Enter' , endOfGame: true, resetGame: false})

            setIsActive(false)
            setEndGame(true)
        }

    }, [seconds, handleKeyUp])

    //KEY PRESS LOGIC//
    useEffect(() => {

        window.addEventListener('keyup', handleKeyUp)

        if (endGame || startGame) {
            window.removeEventListener('keyup', handleKeyUp)
        }

        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }

    }, [handleKeyUp, endGame, startGame])

    return (
        <div className='container'>
            <div className={"Game" + duringEndGame + duringStartGame}>
                <Timer seconds={seconds} />
                <Scoreboard score={score} amountGuessed={amountGuessed} />
                <Slots currentWord={currentWord} />
                <Keys keys={letters} availableLetters={availableLetters} />
            </div>
            <div>
                {startGame && <StartGamePopUp highScore={0} setStartGamePopUp={setStartGame} setIsActive={setIsActive} />}
            </div>
            <div>
                {endGame && <EndGamePopUp score={score} amountGuessed={amountGuessed} setEndGamePopUp={setEndGame} setStartGamePopUp={setStartGame} setSeconds={setSeconds} handleKeyUp={handleKeyUp}/>}
            </div>
        </div>
    )
}
