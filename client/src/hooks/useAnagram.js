import { useState } from 'react'

const useAnagram = (letters) => {

    const [currentWord, setCurrentWord] = useState('')
    const [amountGuessed, setAmountGuessed] = useState(0)
    const [score, setScore] = useState(0)

    const [usedWords, setUsedWords] = useState([])

    const handleKeyUp = ({ key }) => {

        if (key === 'Enter') {

            if (usedWords.includes(currentWord)) {
                console.log('already guessed this word, try again please')
                return
            }
            else if (currentWord.length < 3) {
                console.log('word too short')
            }

            setUsedWords((prevUsedWords) => {
                return [...prevUsedWords, currentWord]
            })

            setAmountGuessed((prevAmount) => {
                return prevAmount + 1
            })

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

            console.log('new word guessed:', currentWord, '\namount guessed:', amountGuessed)
            setCurrentWord('')
        }
        if (key === 'Backspace') {
            setCurrentWord((prev) => {
                return prev.slice(0, -1)
            })
        }

        if (letters.includes(key) && currentWord.length < 6 && !currentWord.includes(key)) {

            setCurrentWord((prev) => {
                return prev + key
            })
        }

        console.log(currentWord)
    }

    return { handleKeyUp, currentWord, usedWords, amountGuessed, score }
}

export default useAnagram