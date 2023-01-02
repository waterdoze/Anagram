import { useState } from 'react'

const useAnagram = (letters) => {

    const [currentWord, setCurrentWord] = useState('')
    const [amountGuessed, setAmountGuessed] = useState(0)
    const [score, setScore] = useState(0)

    const [usedWords, setUsedWords] = useState([])


    
    

    const handleKeyUp = ({ key }) => {
        var available_letters = []
        for (let i = 0; i < letters.length; i++) {
            available_letters[letters[i]] = (available_letters[letters[i]] || 0) + 1
        }
        for (let i = 0; i < currentWord.length; i++) {
            available_letters[currentWord[i]] -= 1
        }

        if (key === 'Enter') {

            if (usedWords.includes(currentWord)) {
                console.log('already guessed this word, try again please')
                return
            }
            if (currentWord.length < 3) {
                console.log('word too short')
                return
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
            available_letters[currentWord[currentWord.length - 1]] += 1
            setCurrentWord((prev) => {
                return prev.slice(0, -1)
            })
        }

        if (letters.includes(key.toLowerCase()) && currentWord.length < 6 && available_letters[key.toLowerCase()] > 0) {
            available_letters[key.toLowerCase()] -= 1
            console.log(available_letters[key.toLowerCase()])
            setCurrentWord((prev) => {
                return prev + key.toLowerCase()
            })
        }

        console.log(currentWord)
    }

    return { handleKeyUp, currentWord, usedWords, amountGuessed, score }
}

export default useAnagram