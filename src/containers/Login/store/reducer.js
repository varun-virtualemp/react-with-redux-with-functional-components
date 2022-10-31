import {getLoggedInUserData} from '../../../utils/helper'
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, RESET_LOGGED_USER_DATA } from './constants'

let user = getLoggedInUserData()
const initialState = user ? { user } : {}

export function authenticatedUser(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case LOGIN_REQUEST:
            return {
                user        : {},
            }
        
        case LOGIN_SUCCESS:
            return {
                user        : payload,
            }
        
        case LOGIN_FAILURE:
            return {
                user        : {},
            }

        case RESET_LOGGED_USER_DATA:
            return [];
        
        default:
            return state
    }
}