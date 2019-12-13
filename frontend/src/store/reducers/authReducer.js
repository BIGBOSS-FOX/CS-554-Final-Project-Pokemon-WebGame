const initState = {
    authError: null,
    userInfo: {
        _id: '',
        userName: '',
        userId: '',
        passWord: '',
        monster: [],
        eMail: '',
        currentScore: 0,
        bestScore: 0
    }
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            console.log('authReducer.js LOGIN_ERROR')
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGIN_SUCCESS':
            console.log('authReducer.js LOGIN_SUCCESS')
            console.log(action)
            return {
                ...state,
                authError: null,
                userInfo: {
                    _id: action.userInfo._id,
                    userName: action.userInfo.userName,
                    userId: action.userInfo.userId,
                    passWord: action.userInfo.passWord,
                    monster: action.userInfo.monster,
                    eMail: action.userInfo.eMail,
                    currentScore: action.userInfo.currentScore,
                    bestScore: action.userInfo.bestScore
                }
            }
        case 'LOGOUT_SUCCESS':
            console.log('authReducer.js LOGOUT_SUCCESS')
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('authReducer.js SIGNUP_SUCCESS')
            console.log(action)
            // console.log('authReducer.js action.userInfo')
            // console.log(action.userInfo)
            return {
                ...state,
                authError: null,
                userInfo: {
                    _id: action.userInfo._id,
                    userName: action.userInfo.userName,
                    userId: action.userInfo.userId,
                    passWord: action.userInfo.passWord,
                    monster: action.userInfo.monster,
                    eMail: action.userInfo.eMail,
                    currentScore: action.userInfo.currentScore,
                    bestScore: action.userInfo.bestScore
                }
            }
        case 'SIGNUP_ERROR':
            console.log('authReducer.js SIGNUP_ERROR')
            return {
                ...state,
                authError: action.err.message               
            }
        case 'FETCHUSER_SUCCESS':
            console.log('authReducer.js FETCHUSER_SUCCESS')
            console.log(action)
            return {
                ...state,
                authError: null,
                userInfo: {
                    _id: action.userInfo._id,
                    userName: action.userInfo.userName,
                    userId: action.userInfo.userId,
                    passWord: action.userInfo.passWord,
                    monster: action.userInfo.monster,
                    eMail: action.userInfo.eMail,
                    currentScore: action.userInfo.currentScore,
                    bestScore: action.userInfo.bestScore
                }
            }
        case 'FETCHUSER_ERROR':
            console.log('authReducer.js FETCHUSER_ERROR')
            return {
                ...state,
                authError: action.err.message               
            }
        // case 'FETCHCLEAR_SUCCESS':
        //     console.log('authReducer.js FETCHCLEAR_SUCCESS')
        //     return {
        //         ...state,
        //         authError: null,
        //         userInfo: {
        //             _id: action.userInfo._id,
        //             userName: action.userInfo.userName,
        //             userId: action.userInfo.userId,
        //             passWord: action.userInfo.passWord,
        //             monster: [],
        //             eMail: action.userInfo.eMail,
        //             currentScore: action.userInfo.currentScore,
        //             bestScore: action.userInfo.bestScore
        //         }
        //     }
        // case 'FETCHCLEAR_ERROR':
        //     console.log('authReducer.js FETCHCLEAR_ERROR')
        //     return {
        //         ...state,
        //         authError: action.err.message
        //     }    
        default:
            return state;
    }
    return state;
};

export default authReducer;