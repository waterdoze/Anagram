import React, { useState } from 'react'

const useAnagram = (letters) => {

    const [currentWord, setCurrentWord] = useState('')
    const [usedWords, setUsedWords] = useState([])
    
    const handleKeyUp = ({ key }) => {

        if (key === 'Backspace') {
            setCurrentWord((prev) => {
                return prev.slice(0, -1)
            })
        }

        if (letters.includes(key) && currentWord.length < 6) {
            setCurrentWord((prev) => {
                return prev + key
            })
        }

        console.log(currentWord)
    }

    return { handleKeyUp, currentWord, usedWords }
}

export default useAnagram