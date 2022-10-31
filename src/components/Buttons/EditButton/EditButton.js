import { NavLink } from "react-router-dom"

export const EditButton = ({urlToBeNavigated}) => (
    <NavLink to={urlToBeNavigated} className="ms-2" title="Edit">
        <i className="fa fa-pencil" aria-hidden="true"></i>
    </NavLink>
)