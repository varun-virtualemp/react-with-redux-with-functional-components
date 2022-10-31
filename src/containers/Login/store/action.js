import axios from 'axios'

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, RESET_LOGGED_USER_DATA } from './constants'
import { setLoader } from '../../../store'
import { history, API_URL } from '../../../utils/helper'

export const login = (postData = {}, props) => {
    return async dispatch => {
        dispatch(setLoader(true))
        dispatch({ type: LOGIN_REQUEST })
        try {
            const response = await axios.post(`${API_URL}login`, postData);

            if (response.data.success) {
                const userData = (response.data.data.user)
                dispatch({ type : LOGIN_SUCCESS, payload : userData})
                localStorage.setItem('data', JSON.stringify(userData))
                localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken))
                const { from } = props?.location?.state || { from: { pathname: '/dashboard' } }
                console.log('from', from)
                history.push(from)
            }

            dispatch(setLoader(false))

        } catch(error) {
            dispatch(setLoader(false))
            dispatch({ type: LOGIN_FAILURE })
        }
    }
}

/* action resetting logged user data */
export const resetLoggedUserData = () => {
    return async dispatch => {
        dispatch({ type: RESET_LOGGED_USER_DATA })
    }
}
