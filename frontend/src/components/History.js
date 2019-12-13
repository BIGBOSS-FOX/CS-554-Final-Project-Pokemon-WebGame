import React from 'react'

const History = ({bestScore}) => {
    console.log("History.js props")
    console.log(bestScore)
    return (
        <div className="container">
            <h4 className="pink-text text-lighten-1 center">Your Highest Score</h4>
            <h4 className="pink-text text-lighten-1 center">{bestScore}</h4>
        </div>
    )
}

export default History


