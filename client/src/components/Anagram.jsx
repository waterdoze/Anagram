import React, { useEffect, useState } from 'react'
import Axios from 'axios'

import useAnagram from '../hooks/useAnagram'
import Keys from './Keys'
import Scoreboard from './Scoreboard'
import Slots from './Slots'
import EndGamePopUp from '../hooks/EndGamePopUp'
import StartGamePopUp from '../hooks/StartGamePopUp'
import Timer from './Timer'

export default function Anagram() {

    const [letters, setLetters] = useState(''.split('')) //this is the word that is being guessed
    console.log(letters)
    const [endGame, setEndGame] = useState(false)
    const [startGame, setStartGame] = useState(true)
    const { handleKeyUp, currentWord, score, amountGuessed, availableLetters } = useAnagram(letters)

    ////////////amount of time allowed each game////////////
    const [seconds, setSeconds] = useState(5)
    ////////////////////////////////////////////////////////
    const [isActive, setIsActive] = useState(false)
    const [chooseLetters, setChooseLetters] = useState(false)

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

    //WHEN TIMER RUNS OUT//
    useEffect(() => {

        if (seconds === 0) {
            //stimuate enter was pressed
            handleKeyUp({ key: 'Enter' , endOfGame: true, resetGame: false})
            setIsActive(false)
            setEndGame(true)
            setLetters(''.split(''))
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

        if(chooseLetters){
            Axios.get(`http://localhost:3001/randomWord`).then((response) => {
                setLetters(response.data[0].word.split(''))
            })
        }
        setChooseLetters(false)
    } ,[letters, chooseLetters])

    return (
        <div className='container'>
            <div className={"Game" + duringEndGame + duringStartGame}>
                <Timer seconds={seconds} />
                <Scoreboard score={score} amountGuessed={amountGuessed} />
                <Slots currentWord={currentWord} />
                {isActive &&
                <Keys keys={letters} availableLetters={availableLetters} />}
            </div>
            <div>
                {startGame && <StartGamePopUp highScore={0} setStartGamePopUp={setStartGame} setIsActive={setIsActive} setLetters = {setLetters} setChooseLetters = {setChooseLetters} />}
            </div>
            <div>
                {endGame && <EndGamePopUp score={score} amountGuessed={amountGuessed} setEndGamePopUp={setEndGame} setStartGamePopUp={setStartGame} setSeconds={setSeconds} handleKeyUp={handleKeyUp}/>}
            </div>
        </div>
    )
}
