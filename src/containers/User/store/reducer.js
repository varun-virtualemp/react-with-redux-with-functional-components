import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FETCH_USER_EDIT_FORM_FAILURE, FETCH_USER_EDIT_FORM_REQUEST, FETCH_USER_EDIT_FORM_SUCCESS, RESET_USER_DATA, SUBMIT_USER_FORM_FAILURE, SUBMIT_USER_FORM_REQUEST, SUBMIT_USER_FORM_SUCCESS, USER_LIST_FAILURE, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "./constants"

export function user(state = [], action) {
    const { type, payload } = action

    switch (type) {
        /* cases for listing of user starts */
        case USER_LIST_REQUEST:
            return {
                userList        : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
            }
        
        case USER_LIST_SUCCESS:
            return {
                userList        : payload.user,
                totalRecords    : payload.total,
                per_page        : payload.per_page,
                currentPage     : payload.current_page,
            }
        
        case USER_LIST_FAILURE:
            return {
                userList        : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
            }

        /* cases for delete user starts */
        case DELETE_USER_REQUEST:
            return {
                ...state,
            }
        
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                userList    : payload,
            }
        
        case DELETE_USER_FAILURE:
            return {
                ...state
            }
        
        /* cases for edit form starts */
        case FETCH_USER_EDIT_FORM_REQUEST:
            return {
                users    : [],
            }
        
        case FETCH_USER_EDIT_FORM_SUCCESS:
            return {
                user     : payload.user,
            }
        
        case FETCH_USER_EDIT_FORM_FAILURE:
            return {
                ...state,
            }

        /* cases for submit form starts */
        case SUBMIT_USER_FORM_REQUEST:
            return {
                ...state,
            }
        
        case SUBMIT_USER_FORM_SUCCESS:
            return {
                ...state
            }
        
        case SUBMIT_USER_FORM_FAILURE:
            return {
                ...state
            }

        case RESET_USER_DATA:
            return []

        default:
            return state
    }
}