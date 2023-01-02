import React from 'react'
import { useEffect } from 'react'
import useAnagram from '../hooks/useAnagram'
import Keys from './Keys'
import Scoreboard from './Scoreboard'
import Slots from './Slots'

export default function Anagram({ letterString }) {

    const letters = letterString.split("")
    const { handleKeyUp, currentWord, score, amountGuessed } = useAnagram(letters)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp])
    return (
        <div>
            <Scoreboard score={score} amountGuessed={amountGuessed} />
            <Slots currentWord={currentWord} />
            <Keys keys={letters} />
        </div>
    )
}
