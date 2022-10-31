import { SET_LOADER } from "./constants"

const initialState = {
    blocking : false
}

export function globalState(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case SET_LOADER:
            return {
                blocking    : payload,
            }
        
        default:
            return state
    }
}