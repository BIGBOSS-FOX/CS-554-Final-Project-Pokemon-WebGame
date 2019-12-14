import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import History from './History'
import Leaderboard from './Leaderboard'
import { connect } from 'react-redux'
import { logOut, fetchUserInfo} from '../store/actions/authAction'
import { fetchAllUsers } from '../store/actions/fetchAction'
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class User extends Component {
    // state = {
    //     username: '',
    //     email: ''
    // }
    componentDidMount() {
        console.log('User.js componentDidMount() props before fetchUserInfo')
        console.log(this.props)
        this.props.fetchUserInfo(this.props.auth_firebase.email);
        this.props.fetchAllUsers();
        // this.setState({
        //     email: this.props.auth_firebase.email
        // })
    }

    handleClick = async () => {
        await axios.put(`http://localhost:5000/users/monster/user/clearmonster/${this.props.auth_mongodb.userInfo._id}`)
        let userId = this.props.auth_mongodb.userInfo._id;
        console.log('@@@@@@   ' + userId);
        this.props.history.push({ pathname: `/pokemon`, state: { userId: userId } });
    }
    
    render() {
        const { auth_firebase, auth_mongodb } = this.props;
        console.log("User.js render() props")
        console.log(this.props)

        if (!auth_firebase.uid) return <Redirect to= {'/'} />
        console.log("User.js render() auth_firebase.uid")
        console.log(auth_firebase.uid)
        return (
            <div className="container">
                <h2 className="center cyan-text text-accent-3">Welcome {auth_mongodb.userInfo.userName}</h2>
                <div className="col s12 m6 center">
                        {/* <Link to={'/'}> */}
                            <button className="btn pink lighten-1 z-depth-1" onClick={this.props.logOut}>Logout</button>
                        {/* </Link> */}
                </div>
                <div className='row center newgame'>
                    {/* <div className="col s12 m6 center"> */}
                        {/* <Link to={'/pokemon'}> */}
                            <button className="waves-effect waves-light btn-large cyan pulse" onClick={this.handleClick}>New Game</button>
                        {/* </Link> */}
                    {/* </div> */}
                    {/* <div className="col s12 m6 center">
                        <Link to={'/game'}>
                            <button className="waves-effect waves-light btn-large">Resume Game</button>
                        </Link>
                    </div> */}
                </div>
                <div className='row'>
                    <div className="col s12 m6 center">
                        <History bestScore={this.props.auth_mongodb.userInfo.bestScore}/>
                    </div>
                    <div className="col s12 m6 center">
                        <Leaderboard userList={this.props.fetch_mongodb.userList}/>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log('User.js mapStateToProps state')
    console.log(state);

    return {
        auth_firebase: state.firebase.auth,
        auth_mongodb: state.auth,
        fetch_mongodb: state.fetch
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('User.js mapDispatchToProps dispatching actions')
    return {
        logOut: () => dispatch(logOut()),
        fetchUserInfo: (email) => dispatch(fetchUserInfo(email)),
        fetchAllUsers: () => dispatch(fetchAllUsers())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User)
