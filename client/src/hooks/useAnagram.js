import { useState } from 'react'

const useAnagram = (letters) => {

    const [currentWord, setCurrentWord] = useState('')
    const [amountGuessed, setAmountGuessed] = useState(0)
    const [score, setScore] = useState(0)
    const [usedWords, setUsedWords] = useState([])

    let avl = {}
    for (let i = 0; i < letters.length; i++) {
        avl[letters[i]] = (avl[letters[i]] || 0) + 1
    }

    const [availableLetters, setAvailableLetters] = useState(avl)

    const handleKeyUp = ({ key, endOfGame, resetGame }) => {


        if (key === 'Enter') {

            if (usedWords.includes(currentWord)) {
                console.log('already guessed this word, try again please')
                if(endOfGame) {
                    setCurrentWord('')
                }
                if(resetGame){
                    setCurrentWord('')
                    setAmountGuessed(0)
                    setScore(0)
                    setUsedWords([])
                }
                return
            }
            if (currentWord.length < 3) {
                console.log('word too short')
                if(endOfGame) {
                    setCurrentWord('')
                }
                if(resetGame){
                    setCurrentWord('')
                    setAmountGuessed(0)
                    setScore(0)
                    setUsedWords([])
                }
                return
            }

            setUsedWords((prevUsedWords) => {
                return [...prevUsedWords, currentWord]
            })

            setAmountGuessed((prevAmount) => {
                return prevAmount + 1
            })
            
            //allocate points depending on word length
            switch (currentWord.length) {
                case 3:
                    setScore((prev) => {
                        return prev + 100
                    })
                    break
                case 4:
                    setScore((prev) => {
                        return prev + 400
                    })
                    break
                case 5:
                    setScore((prev) => {
                        return prev + 1200
                    })
                    break
                case 6:
                    setScore((prev) => {
                        return prev + 2000
                    })
                    break
                default:
                    console.log('huh???')
            }
            setCurrentWord('')
            makeAvailable(letters)
            if(resetGame){
                setCurrentWord('')
                setAmountGuessed(0)
                setScore(0)
                setUsedWords([])
            }
        }

        if (key === 'Backspace') {
            setAvailableLetters((prev) => ({...prev, [currentWord[currentWord.length - 1]]: prev[currentWord[currentWord.length - 1]] + 1}))
            setCurrentWord((prev) => {
                return prev.slice(0, -1)
            })
        }

        if (letters.includes(key.toLowerCase()) && currentWord.length < 6 && availableLetters[key.toLowerCase()] > 0) {
            setAvailableLetters((prev) => ({...prev, [key.toLowerCase()]: prev[key.toLowerCase()] - 1}))
            setCurrentWord((prev) => {
                return prev + key.toLowerCase()
            })

        }
    }

    const makeAvailable = (letters) => {
        let avl = {}
        for (let i = 0; i < letters.length; i++) {
            avl[letters[i]] = (avl[letters[i]] || 0) + 1
        }
        setAvailableLetters(avl)
    }

    return { handleKeyUp, currentWord, usedWords, amountGuessed, score, availableLetters }
}

export default useAnagram