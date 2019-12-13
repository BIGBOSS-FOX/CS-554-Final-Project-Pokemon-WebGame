import axios from 'axios'

export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        const res = await axios.get('http://localhost:5000/users/')
        try {
            console.log('authAction.js fetchAllUsers res from mongodb')
            console.log(res)
            dispatch({ type: 'FETCHUSERS_SUCCESS', userInfo: res.data })
        } catch (err) {
            dispatch({ type: 'FETCHUSERS_ERROR', err })
        }      
    }
}