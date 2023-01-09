import React from 'react'

export default function Scoreboard({ score, amountGuessed}) {
  return (
    <div className='scoreboard'>
        <div className='score'>Score: {score}</div>
        <div className='amount'>Words: {amountGuessed}</div>
    </div>
  )
}
