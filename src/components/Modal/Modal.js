import React from 'react'
import Modal from "react-bootstrap/Modal"

export const PopUpModal = ({showModal, modalTitle, modalBody, handleModalClose, updateData}) => {
    const _handleModalCloseClick = () => handleModalClose(false)

    const _executeDeleteRequest = () => updateData(true)

    return (
        <Modal show={showModal} onHide={_handleModalCloseClick} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalBody}</Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-danger" onClick={_handleModalCloseClick}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={_executeDeleteRequest}>Yes</button>
            </Modal.Footer>
        </Modal>
    )
}
