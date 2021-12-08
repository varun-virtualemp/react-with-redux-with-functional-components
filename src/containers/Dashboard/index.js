import React from "react";
import { useSelector } from 'react-redux';

const Dashboard = (props) => {
    /**fetched data from redux store */
    const loggedUser = useSelector(state => state.authenticatedUser);
    const {user} = loggedUser;
    
    return (
        <div className="col main pt-5 mt-3">
            <h1 className="display-4 d-none d-sm-block">
                Welcome {user.full_name || ''}
            </h1>
        </div>
    )
}

export default Dashboard;