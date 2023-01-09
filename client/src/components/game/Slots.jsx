import React from 'react'

export default function Slots({ currentWord }) {

    if (currentWord) {
        return (
            <div className='row slots'>
                {currentWord.split('').map((letter, index) => (
                    <div key={index}>{letter}</div>
                ))}

                {[...Array(6 - currentWord.length)].map((_, index) => (
                    <div key={index} />
                ))}
            </div>
        )
    }
    return (
        <div className='row slots'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
