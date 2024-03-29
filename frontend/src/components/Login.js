import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn, clearAuthError } from '../store/actions/authAction'
import { Redirect } from 'react-router-dom'
// import bcrypt from 'bcryptjs'
// var salt = bcrypt.genSaltSync(10);


class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleClick = () => {
        this.props.clearAuthError();
        this.props.history.push({ pathname: `/signup` });
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // var hash_password = bcrypt.hashSync(this.state.password, salt);
        // await this.setState({password: hash_password});
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
                    <h1 className="pink-text text-lighten-1">Login</h1>
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
                    <p className="blue-text text-darken-3">Don't have an account?</p>
                    <div className="margintop1">
                        {/* <Link to={'/signup'}> */}
                                <button className="waves-effect waves-light btn" onClick={this.handleClick}>Signup</button>
                        {/* </Link> */}
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
        logIn: (creds) => dispatch(logIn(creds)),
        clearAuthError: () => dispatch(clearAuthError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
