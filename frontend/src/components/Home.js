import React, { Component } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import Leaderboard from './Leaderboard'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchAllUsers } from '../store/actions/fetchAction'

class Home extends Component {
    componentDidMount() {
        // console.log('User.js componentDidMount() props before fetchUserInfo')
        // console.log(this.props)
        // this.props.fetchUserInfo(this.props.auth_firebase.email);
        this.props.fetchAllUsers();
        // this.setState({
        //     email: this.props.auth_firebase.email
        // })
    }
    render() {
        const { auth } = this.props;
        console.log(this.props)
        if (!auth.isLoaded) return <p></p>
        if (auth.uid) return <Redirect to= {'/user/' + auth.uid} />
        return (
            <div className="container">
                <div className="title home">
                    <h1 className="center cyan-text text-accent-3 brand-logo">Welcome To Pokemon Master</h1>
                    {/* <Link to={'/test'}>
                        <p className="center">To Test Page</p>
                    </Link> */}
                </div>

                <div className='row home'>
                    <div className="col s12 m6 center">
                        <Link to={'/login'}>
                            <button className="waves-effect waves-light btn-large">Login</button>
                        </Link>
                    </div>
                    <div className="col s12 m6 center">
                        <Link to={'/signup'}>
                            <button className="waves-effect waves-light btn-large">Signup</button>
                        </Link>
                    </div>
                </div>
                <div className="leaderboard home">
                    <Leaderboard userList={this.props.fetch_mongodb.userList}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        fetch_mongodb: state.fetch
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log('User.js mapDispatchToProps dispatching actions')
    return {
        // logOut: () => dispatch(logOut()),
        // fetchUserInfo: (email) => dispatch(fetchUserInfo(email)),
        fetchAllUsers: () => dispatch(fetchAllUsers())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);