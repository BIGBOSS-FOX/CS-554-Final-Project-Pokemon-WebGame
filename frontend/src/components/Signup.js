import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authAction'
import { Redirect } from 'react-router-dom'

class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.signUp(this.state)
    }
    render() {
        const { auth_mongodb, auth_firebase } = this.props;
        // console.log(this.props)
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
                        <button className="btn pink lighten-1 z-depth-1">Signup</button>
                        <div className="red-text center">
                            { auth_mongodb ? <p>{auth_mongodb.authError}</p> : null}
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
        auth_mongodb: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
