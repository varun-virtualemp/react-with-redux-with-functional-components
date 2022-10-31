import api from '../../../axios'

import { setLoader } from '../../../store'
import {history, displaySuccessMessage} from '../../../utils/helper'
import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FETCH_USER_EDIT_FORM_FAILURE, FETCH_USER_EDIT_FORM_REQUEST, FETCH_USER_EDIT_FORM_SUCCESS, RESET_USER_DATA, SUBMIT_USER_FORM_FAILURE, SUBMIT_USER_FORM_REQUEST, SUBMIT_USER_FORM_SUCCESS, USER_LIST_FAILURE, USER_LIST_REQUEST, USER_LIST_SUCCESS } from './constants';

/* action for fetching user records */
export const fetchUserData = (params) => {
    return async dispatch => {
        dispatch(setLoader(true))
        dispatch({ type: USER_LIST_REQUEST })
        try {
            const response = await api.get('user', { params })
            if (response.data.success) {
                dispatch({ type : USER_LIST_SUCCESS, payload : response.data.data})
            }

            dispatch(setLoader(false))

        } catch(error) {
            dispatch(setLoader(false))
            dispatch({ type: USER_LIST_FAILURE})
        }
    }
}

/* action for deleting user record */
export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        dispatch(setLoader(true))
        dispatch({ type: DELETE_USER_REQUEST })
        try {
            const response = await api.delete('user/'+id)
    
            if (response.data.success) {
                const updatedUsersList =  getState().user.userList.filter(user => user.id !== id)
                dispatch({ type : DELETE_USER_SUCCESS, payload : updatedUsersList})
                displaySuccessMessage('Record Deleted Successfully')
            } 

            dispatch(setLoader(false))

        } catch(error) {
            dispatch(setLoader(false))
            dispatch({ type: DELETE_USER_FAILURE})
        }
    }
}

/* action for fetching user dependant records */
export const fetchUserEditFormDependantData = (id) => {
    return async dispatch => {
        dispatch(setLoader(true))
        dispatch({ type: FETCH_USER_EDIT_FORM_REQUEST })
        try {
            const response = await api.get(`user/${id}`)
            
            if (response.data.success) {
                dispatch({ type : FETCH_USER_EDIT_FORM_SUCCESS, payload : response.data.data})
            }

            dispatch(setLoader(false))

        } catch(error) {
            dispatch(setLoader(false))
            dispatch({ type: FETCH_USER_EDIT_FORM_FAILURE })
        }
    }
}

/* action for submitting user record */
export const submitUserFormData = (id,postData) => {
    return async dispatch => {
        dispatch(setLoader(true))
        dispatch({ type: SUBMIT_USER_FORM_REQUEST })
        try {
            let response = ''
            if(id)
                response = await api.put(`user/${id}`, postData)
            else
                response = await api.post(`user`, postData)
            
            if (response.data.success) {
                dispatch({ type : SUBMIT_USER_FORM_SUCCESS})
                displaySuccessMessage(response.data.data.data)
                history.push('/user')
            }

            dispatch(setLoader(false))

        } catch(error) {
            dispatch(setLoader(false))
            dispatch({ type: SUBMIT_USER_FORM_FAILURE })
        }
    }
}

/* action resetting user store data */
export const resetUserData = () => {
    return async dispatch => {
        dispatch({ type: RESET_USER_DATA })
    }
}