import { combineReducers } from 'redux';

import { authenticatedUser } from './Login';
import { user } from './User';

const rootReducer = combineReducers({
    authenticatedUser,
    user,
});

export default rootReducer;