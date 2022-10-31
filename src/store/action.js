import { SET_LOADER } from "./constants"

/* action for show/hide loader */
export const setLoader = (payload) => (dispatch) => dispatch({ type: SET_LOADER, payload })
