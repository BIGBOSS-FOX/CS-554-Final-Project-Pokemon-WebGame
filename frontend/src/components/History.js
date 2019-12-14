import React from 'react'

const History = ({bestScore}) => {
    console.log("History.js props")
    console.log(bestScore)
    return (
        <div className="container">
            <h2 className="pink-text text-darken-1 center">Your Highest Score</h2>
            <h3 className="pink-text text-darken-1 center">{bestScore}</h3>
        </div>
    )
}

export default History


