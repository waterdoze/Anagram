import React from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

import shuffleLetters from '../../hooks/shuffleLetters'

export default function Game() {

    const navigate = useNavigate()
    
        
    const handleStartGame = async () => {
        const response = await Axios.get('http://localhost:3001/randomWord')
        const res = await Axios.post('http://localhost:3001/createGame', {sixLetterWord: shuffleLetters(response.data[0].word.split(''))})
        navigate(`/game/${res.data._id}`)
    }
        
        


    return (
        <div className="game">
            <button onClick = {() => handleStartGame()}>Start Game</button>
        </div>
    )
}