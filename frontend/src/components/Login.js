import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn } from '../store/actions/authAction'
import { Redirect } from 'react-router-dom'


class Login extends Component {
    state = {
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
        console.log('Login.js handleSubmit() state before logIn')
        console.log(this.state);
        this.props.logIn(this.state)
    }
    render() {
        const { auth_mongodb, auth_firebase } = this.props;
        // const isLogin = auth.uid ? (
        //     history.push('/user/' + auth.uid)
        //     ) : (
        //         <p>{authError}</p>
        //     )
        if (!auth_firebase.isLoaded) {
            console.log('Login.js render() auth_firebase.Loaded == False')
            return <p>authenticating...</p>
        }
        if (auth_firebase.uid) {
            console.log('Login.js render() auth_firebase.uid before redirect to user page')
            return <Redirect to= {'/user/' + auth_firebase.uid} />
        }

        console.log('Login.js render() props')
        console.log(this.props)
        return (
            <div className='container'>
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="pink-text text-lighten-1">Login</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-1">Login</button>
                        <div className="red-text center">
                            { auth_mongodb ? <p>{auth_mongodb.authError}</p> : null}
                            {/* { auth.isLoaded && isLogin } */}
                        </div>
                    </div>
                </form>
                <div>
                    <p className="pink-text text-lighten-1">Don't have an account?</p>
                    <div className="margintop1">
                        <Link to={'/signup'}>
                                <button className="waves-effect waves-light btn">Signup</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('Login.js mapStateToProps state')
    console.log(state)
    return {
        auth_mongodb: state.auth,
        auth_firebase: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('Login.js mapDispatchToProps dispatching actions')
    return {
        logIn: (creds) => dispatch(logIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
