export const DeleteButton = ({handleClick}) => {
    {/* eslint-disable-next-line */}
    return(
        <a 
            className="ms-2" 
            title="Delete" 
            style={{'cursor':'pointer'}}
            onClick={handleClick}
        >
            <i className="fa fa-trash" aria-hidden="true"></i>
        </a>
    )
}