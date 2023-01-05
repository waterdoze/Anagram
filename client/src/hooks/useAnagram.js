import { useState } from 'react'
import '../css/index.css'
import Axios from 'axios'


const useAnagram = (letters) => {

    const [currentWord, setCurrentWord] = useState('')
    const [amountGuessed, setAmountGuessed] = useState(0)
    const [score, setScore] = useState(0)
    const [usedWords, setUsedWords] = useState([])

    const handleKeyUp = ({ key, endOfGame, resetGame }) => {

        //hashmap of the available letters to use
        var available_letters = []
        for (let i = 0; i < letters.length; i++) {
            available_letters[letters[i]] = (available_letters[letters[i]] || 0) + 1
        }
        for (let i = 0; i < currentWord.length; i++) {
            available_letters[currentWord[i]] -= 1
        }

        //hashmap of the indexes of letters available to use
        var letter_indexes = []
        for (let i = 0; i < letters.length; i++) {
            letter_indexes[letters[i]] = letter_indexes[letters[i]] || []
            letter_indexes[letters[i]].push(i)
        }
        var last_letter_index = -1
        for (let i = 0; i < currentWord.length; i++) {
            if (i === currentWord.length - 1) {
                last_letter_index = letter_indexes[currentWord[i]][0]
            }
            letter_indexes[currentWord[i]].shift()
        }
        console.log(letter_indexes)

        //check if key pressed is enter and if the word has been guessed before and if the word is long enough and TODO: if the word is within the dictionary
        if (key === 'Enter') {

            if (usedWords.includes(currentWord) || currentWord.length < 3) {
                console.log('already guessed this word, try again please : or word is too short')
                if (endOfGame) {
                    setCurrentWord('')
                    for (let i = 0; i < letters.length; i++) {
                        var letter = document.querySelector('.row.keys>div:nth-child(' + (i + 1) + ')')
                        letter.style.backgroundColor = '#444440'
                    }
                }
                if (resetGame) {
                    setCurrentWord('')
                    setAmountGuessed(0)
                    setScore(0)
                    setUsedWords([])
                }

                return
            }

            Axios.get(`http://localhost:3001/exists/${currentWord}`).then((response) => {

                if (!response.data) {
                    console.log("word doesn't exist!")
                }
                else {
                    console.log('word found!\n', response.data)
                    handleCorrectGuess(resetGame)
                }

                return
            })

        }
        
        if (key === 'Backspace') {
            if (currentWord.length === 0) {
                return
            }
            available_letters[currentWord[currentWord.length - 1]] += 1
            //unblackout the letter that was just pressed

            var letter = document.querySelector('.row.keys>div:nth-child(' + (last_letter_index + 1) + ')')
            letter.style.backgroundColor = '#444440'

            setCurrentWord((prev) => {
                return prev.slice(0, -1)
            })
        }
        //check if key pressed is a letter that is an available letter and if the current word is less than 6 letters long
        if (letters.includes(key.toLowerCase()) && currentWord.length < 6 && available_letters[key.toLowerCase()] > 0) {
            available_letters[key.toLowerCase()] -= 1
            setCurrentWord((prev) => {
                return prev + key.toLowerCase()
            })

            //blackout the letter that was just pressed
            var letter_index = letter_indexes[key.toLowerCase()].shift()
            var letter_i = document.querySelector('.row.keys>div:nth-child(' + (letter_index + 1) + ')')
            letter_i.style.backgroundColor = 'rgb(37, 35, 35)'

        }

    }

    const handleCorrectGuess = (resetGame) => {
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

        console.log('new word guessed:', currentWord, '\namount guessed:', amountGuessed)
        setCurrentWord('')
        if (resetGame) {
            setCurrentWord('')
            setAmountGuessed(0)
            setScore(0)
            setUsedWords([])
        }
        //unblackout all the letters

        for (let i = 0; i < letters.length; i++) {
            var letter = document.querySelector('.row.keys>div:nth-child(' + (i + 1) + ')')
            letter.style.backgroundColor = '#444440'
        }
    }

    return { handleKeyUp, currentWord, amountGuessed, score }
}

export default useAnagram