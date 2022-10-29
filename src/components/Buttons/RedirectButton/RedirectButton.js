import { NavLink } from "react-router-dom"

export const RedirectButton = ({urlToBeNavigated, text}) => (
    <NavLink to={urlToBeNavigated} className="btn btn-primary">{text}</NavLink>
)