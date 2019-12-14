import React from 'react'

const Leaderboard = ({userList}) => {
    console.log("Leaderboard.js userList")
    console.log(userList)
    let sortedUserList = [].concat(userList).sort((a, b) => {
        if (a.bestScore < b.bestScore) return 1;
        if (a.bestScore > b.bestScore) return -1;
        return 0;
    });
    console.log(sortedUserList)

    return (
        <div className="container">
            <h2 className="pink-text text-darken-1 center">Leaderboard</h2>
            <table className="highlight">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Best score</th>
                </tr>
                </thead>
                <tbody>
                {sortedUserList.map((user, i) => {
                    return (
                        
                        <tr key={i}>
                            <td>{user.userName}</td>
                            <td>{user.bestScore}</td>
                        </tr>
                            
                    )
                })}
                </tbody> 
            </table>  


            {/* <table className="highlight">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Item Name</th>
                    <th>Item Price</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>Alvin</td>
                    <td>Eclair</td>
                    <td>$0.87</td>
                </tr>
                <tr>
                    <td>Alan</td>
                    <td>Jellybean</td>
                    <td>$3.76</td>
                </tr>
                <tr>
                    <td>Jonathan</td>
                    <td>Lollipop</td>
                    <td>$7.00</td>
                </tr>
                </tbody>
            </table>        */}
        </div>
    )
}

export default Leaderboard
