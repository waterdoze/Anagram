import React from 'react'

export default function Keys({ keys, availableLetters }) {


    return (
        <div className='row keys'>
            {keys.map((letter, index) => (
                <div key={index}>{letter}</div>
            ))}
        </div>
    )
}
