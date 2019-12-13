import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authAction'
import { Redirect } from 'react-router-dom'
import { fetchAllUsers } from '../store/actions/fetchAction'

class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        usernameExist: false
    }

    componentDidMount() {
        console.log('Signup.js componentDidMount() props before fetchAllUsers()')
        console.log(this.props)
        this.props.fetchAllUsers();
        // this.setState({
        //     email: this.props.auth_firebase.email
        // })
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        for (let i = 0; i < this.props.fetch_mongodb.userList.length; i++) {
            console.log("Signup handleSubmit() this.props.fetch_mongodb.userList[i].userName")
            console.log(this.props.fetch_mongodb.userList[i].userName)
            if (this.state.username.toLowerCase() === this.props.fetch_mongodb.userList[i].userName) {
                // setTimeout(function(){
                //     this.setState({
                //         usernameExist: true
                //     });
                // },100)
                this.setState({
                    usernameExist: true
                }, () => {
                    console.log("Signup handleSubmit() this.state before breaking for loop ")
                    console.log(this.state)
                    if (!this.state.usernameExist) {
                        console.log("Signup handleSubmit() fire signUp()")
                        this.props.signUp(this.state)
                    }         
                });

                break;
            }
        }

        console.log("Signup handleSubmit() this.state after for loop ")
        console.log(this.state)
        // if (!this.state.usernameExist) {
        //     console.log("Signup handleSubmit() fire signUp()")
        //     this.props.signUp(this.state)
        // }         
            
    }

    render() {
        const { auth_mongodb, auth_firebase, fetch_mongodb } = this.props;
        // console.log("Signup.js render() first user's userName")
        // console.log(fetch_mongodb.userList[0])
        if (!auth_firebase.isLoaded) return <p>authenticating...</p>
        if (auth_firebase.uid) return <Redirect to= {'/user/' + auth_firebase.uid} />
        return (
            <div className='container'>
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="pink-text text-lighten-1">Signup</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button type="submit" className="btn pink lighten-1 z-depth-1">Signup</button>
                        <div className="red-text center">
                            { auth_mongodb ? <p>{auth_mongodb.authError}</p> : null}
                            { this.state.usernameExist ? <p>Username already exists</p> : null}
                        </div>
                    </div>
                </form>
                <div>
                    <p className="pink-text text-lighten-1">Already have an account?</p>
                    <div className="margintop1">
                        <Link to={'/login'}>
                                <button className="waves-effect waves-light btn">Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth_firebase: state.firebase.auth,
        auth_mongodb: state.auth,
        fetch_mongodb: state.fetch
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)),
        fetchAllUsers: () => dispatch(fetchAllUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
