import React, {useState} from 'react'
import shuffleLetters from '../../hooks/shuffleLetters'

export default function Refresh({letters, setLetters}){
    return (
        <div className='refresh'>
            <button onClick={() => setLetters(shuffleLetters(letters)) }>Refresh</button>
        </div>
    )
}
