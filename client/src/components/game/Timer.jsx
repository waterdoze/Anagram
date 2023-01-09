import React from 'react'

export default function Timer({ seconds }) {

    if (seconds === 60) {
        return (
            <div className='timer'>01:00</div>
        )
    }

    if (seconds < 10) {
        return (
            <div className='timer'>00:0{seconds}</div>
        )
    }

    return (
        <div className='timer'>00:{seconds}</div>
    )
}
