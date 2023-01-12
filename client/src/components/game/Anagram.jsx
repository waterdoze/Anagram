import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

import useAnagram from '../../hooks/useAnagram'
import shuffleLetters from '../../hooks/shuffleLetters'
import Keys from './Keys'
import Scoreboard from './Scoreboard'
import Slots from './Slots'
import EndGamePopUp from './EndGamePopUp'
import StartGamePopUp from './StartGamePopUp'
import Timer from './Timer'
import Refresh from './Refresh'

export default function Anagram({ setIsSignedIn }) {

    const gameId = useParams().gameId
    
    const [letters, setLetters] = useState(''.split(''))
    const [endGame, setEndGame] = useState(false)
    const [startGame, setStartGame] = useState(true)
    const { handleKeyUp, currentWord, score, amountGuessed, availableLetters } = useAnagram(letters)

    ////////////amount of time allowed each game////////////
    const [seconds, setSeconds] = useState(6)
    ////////////////////////////////////////////////////////
    const [isActive, setIsActive] = useState(false)
    const [chooseLetters, setChooseLetters] = useState(false)

    const duringEndGame = endGame ? " duringEndGame" : ""
    const duringStartGame = startGame ? " duringStartGame" : ""

    const handleLogOut = () => {
        setIsSignedIn(false)
    }
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

    //WHEN TIMER RUNS OUT//
    useEffect(() => {

        if (seconds === 0) {
            //stimuate enter was pressed
            handleKeyUp({ key: 'Enter', endOfGame: true, resetGame: false })
            setIsActive(false)
            setEndGame(true)
        }

    }, [seconds])

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


    //RANDOMLY SELECTS A WORD FROM THE WORD LIST//
    useEffect(() => {

        if (chooseLetters) {
            Axios.get(`http://localhost:3001/getGame/${gameId}`).then((response) => {
                console.log(response.data.sixLetterWord)
                setLetters(response.data.sixLetterWord.split(''))
            })
        }
        setChooseLetters(false)
    }, [letters, chooseLetters])

    return (
        <div className='container'>
            <div className={"Game" + duringEndGame + duringStartGame}>
                <button className='logoutButton' onClick={handleLogOut}>Log Out</button>

                <Timer seconds={seconds} />
                <Scoreboard score={score} amountGuessed={amountGuessed} />
                <Slots currentWord={currentWord} />
                {(isActive || endGame) &&
                    <Keys keys={letters} />
                }
                {(isActive || endGame) && <Refresh letters={letters} setLetters={setLetters} />}
            </div>
            <div>
                {startGame && <StartGamePopUp highScore={0} setStartGamePopUp={setStartGame} setIsActive={setIsActive} setLetters={setLetters} setChooseLetters={setChooseLetters} />}
            </div>
            <div>
                {endGame && <EndGamePopUp score={score} amountGuessed={amountGuessed} setEndGamePopUp={setEndGame} setStartGamePopUp={setStartGame} setSeconds={setSeconds} handleKeyUp={handleKeyUp} />}
            </div>
        </div>
    )
}
