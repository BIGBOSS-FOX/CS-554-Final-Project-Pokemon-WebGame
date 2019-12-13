// import firebase from 'firebase'
import { getFirebase } from 'react-redux-firebase'
import axios from 'axios'

export const logIn = (credentials) => {
    return (dispatch, getState) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((res) => {
            console.log('authAction.js logIn res.user.email from firebase')
            console.log(res.user.email)

            axios.get('http://localhost:5000/users/email/'+ res.user.email)
            .then((res) => {
                console.log('authAction.js logIn res from mongodb')
                console.log(res)
                dispatch({ type: 'LOGIN_SUCCESS', userInfo: res.data })
            })
            .catch(err => {
                console.log('authAction.js logIn err from mongodb')
                console.log(err)
                dispatch({ type: 'LOGIN_ERROR', err })
            })

        }).catch(err => {
            console.log('authAction.js logIn err from mongodb')
            console.log(err)
            dispatch({ type: 'LOGIN_ERROR', err })
        })

    }
}

export const logOut = () => {
    return (dispatch, getState) => {
        const firebase = getFirebase();

        firebase.auth().signOut()
        .then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS' })
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState) => {
        const firebase = getFirebase();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {
            console.log("authAction.js signUp res from firebase")
            console.log(res);
            // use res.user.uid to create a new user in mongodb
            return axios.post('http://localhost:5000/users/add', {
                userId: res.user.uid.toString(),
                eMail: res.user.email.toString(),
                userName: newUser.username.toString(),
                passWord: newUser.password.toString()

            })
        }).then((res) => {
            // console.log('65784157865776278')
            console.log('authAction.js signUp res.data from mongodb')
            console.log(res.data)
            dispatch({ type: 'SIGNUP_SUCCESS', userInfo: res.data })
        }).catch(err => {
            console.log('authAction.js signUp err from mongodb')
            console.log(err)
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

export const fetchUserInfo = (email) => {
    return (dispatch, getState) => {
        axios.get('http://localhost:5000/users/email/'+ email)
        .then((res) => {
            console.log('authAction.js fetchUserInfo res from mongodb')
            console.log(res)
            dispatch({ type: 'FETCHUSER_SUCCESS', userInfo: res.data })
        })
        .catch(err => {
            dispatch({ type: 'FETCHUSER_ERROR', err })
        })
    }
}

// export const fetchAllUsers = () => {
//     return (dispatch, getState) => {
//         const res = await axios.get('http://localhost:5000/users/')
//         try {
//             console.log('authAction.js fetchAllUsers res from mongodb')
//             console.log(res)
//             dispatch({ type: 'FETCHUSERS_SUCCESS', userInfo: res.data })
//         } catch (err) {
//             dispatch({ type: 'FETCHUSERS_ERROR', err })
//         }

//     }
// }
// export const clearPokemonFromUser = (user_id) => {
//     return (dispatch, getState) => {
//         axios.put(`http://localhost:5000/users/user/monster/clearmonster/${user_id}`)
//         .then((res) => {
//             console.log('authAction.js clearPokemonFromUser res from mongodb')
//             console.log(res)
//             dispatch({ type: 'CLEARMONSTER_SUCCESS'})
//         })
//         .catch(err => {
//             console.log('authAction.js clearPokemonFromUser err')
//             console.log(err)
//             dispatch({ type: 'CLEARMONSTER_ERROR', err })
//         })
//     }
// }

// export const fetchUserClearMonster = (email) => {
//     return (dispatch, getState) => {
//         axios.get('http://localhost:5000/users/email/'+ email)
//         .then((res) => {
//             axios.put(`http://localhost:5000/users/monster/user/clearmonster/${res.data._id}`)
//         })
//         .then((res) => {
//             console.log('authAction.js fetchUserClearMonster res from mongodb')
//             console.log(res)
//             dispatch({ type: 'FETCHCLEAR_SUCCESS', userInfo: res.data })
//         })
//         .catch(err => {
//             dispatch({ type: 'FETCHCLEAR_ERROR', err })
//         })
//     }
// }