const initState = {
    userList: []
}

const fetchReducer = (state = initState, action) => {
    switch(action.type) {
        case 'FETCHUSERS_SUCCESS':
            console.log("fetchReducer.js FETCHUSERS_SUCCESS")
            console.log(action)
            return {
                ...state,
                userList: action.userInfo
            }
        case 'FETCHUSERS_ERROR':
            console.log('fetchReducer.js FETCHUSERS_ERROR')
            return state
        default:
            return state
    }
    return state
}

export default fetchReducer;
