import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import fetchReducer from './fetchReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    firebase: firebaseReducer,
    fetch: fetchReducer
});

export default rootReducer

// the key name will be the data property on the state object
// const initState = {
//     username_list: [] 
// }

// const rootReducer = (state = initState, action) => {
//     if (action.type === 'ADD_USER') {
//         let newUsername_list = [...state.username_list, action.username]
//         return {
//             ...state,
//             username_list: newUsername_list
//         }
//     }
    
//     return state;
// }
