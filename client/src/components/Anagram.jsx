import React from 'react'
import { useEffect } from 'react'
import useAnagram from '../hooks/useAnagram'
import Keys from './Keys'
import Slots from './Slots'

export default function Anagram({ letterString }) {

    const letters = letterString.split("")
    const { handleKeyUp, currentWord } = useAnagram(letters)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp])
    return (
        <div>
            <div>{letterString}</div>
            <Slots />
            <Keys keys={letters} />
        </div>
    )
}
