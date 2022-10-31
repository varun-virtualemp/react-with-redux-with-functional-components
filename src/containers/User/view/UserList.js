import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Pagination from "react-js-pagination"
import _ from 'lodash'

import {Loader, SearchBox, Modal, Table, DeleteButton, EditButton} from "../../../components"
import { fetchUserData, resetUserData, deleteUser } from "../store"
import { displayRecordNotFound } from '../../../utils/helper'
import { RedirectButton } from "../../../components/Buttons"

export const UserList = () => {
    const [searchTitle, setSearchTitle] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedRowId, setSelectedRowId] = useState('')

    /**fetched data from redux store */
    const users = useSelector(state => state.user)
    const dispatch = useDispatch()

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        _getData()

        // returned function will be called on component unmount 
        return () => {
            dispatch(resetUserData())
        }
    }, [searchTitle])// eslint-disable-line react-hooks/exhaustive-deps

    
    /**method to call the configure the data and call the action */
    const _getData = (data) => {
        const params = {
            page    : data ? data : 1,
            search  : searchTitle
        }
        dispatch(fetchUserData(params))
    }

    /**method for calling api based on page change  */
    const _handlePageChange = (pageNumber) => _getData(pageNumber)

    /*method called to when search is performed*/
    const _handleSearchInputChange = (value) => setSearchTitle(value)

    /* build user list */
    const _userListContent = () => {
        if(_.size(userList) > 0)
            return (
                userList.map((data, index) => (
                    <tr key={index} role="row" className={index % 2 === 0 ? "even" : "odd"}>
                        <td>{data.username}</td>
                        <td>{data.first_name}</td>
                        <td>{data.last_name}</td>
                        <td>{data.email}</td>
                        <td className="actions">
                            <EditButton urlToBeNavigated={`/user/edit/${data.id}`} />
                            <DeleteButton handleClick={(event) => _handleModalShowClick(event, index)} />
                        </td>
                    </tr>
                ))
            )
    }

    /*method called to display modal*/
    const _handleModalShowClick = (e,i) => {
        e.preventDefault()
        setShowModal(true)
        setSelectedRowId(users.userList[i].id)
    }

    /*method called to close modal*/
    const _handleModalCloseClick = (value) => {
        setShowModal(value)
    }

    /*method called to when record deleted option is chosen*/
    const _deleteUserData = (status) => {
        if(status) {
            dispatch(deleteUser(selectedRowId));  // action is called to get data
            _handleModalCloseClick(false);  //modal is closed
        }
    }

    const tableHeaders = ['Username', 'First Name', 'Last Name', 'Email', 'Actions']

    const {totalRecords, per_page , blocking, userList, currentPage } = users;
    let total = 0;
    if(typeof totalRecords != 'undefined')
        total = totalRecords;
    
    return (
        <Fragment>
            <Loader blocking={blocking} />
            <h3>User List</h3>

            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 mb-2">
                            <RedirectButton urlToBeNavigated={'/user/create'} text={'Create User'} />
                        </div>
                    
                        <SearchBox searchParentClass="col-xs-12 col-sm-12 col-md-3 col-lg-3 mb-2 offset-lg-7 offset-md-7"
                                    searchText="Search by username/email"
                                    searchInputChangeValue={(val) => _handleSearchInputChange(val)}
                                    searchValue={searchTitle}
                        />
                    </div>
                    
                    <div className="table-responsive">
                        {/* list of records */}
                        {(() => {
                            if (!_.isEmpty(userList)) {
                                return (
                                    <Table tableHeaders={tableHeaders} tableBodyContent={_userListContent} />
                                )
                            } else if (_.isEmpty(users)) {
                                return (
                                    displayRecordNotFound('No User Records Found')
                                )
                            }
                        })()}

                        {(total > per_page) ? 
                            <div className="pagination mb-3" style={{"justifyContent" : "right"}}>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={Number(per_page)}
                                    totalItemsCount={total}
                                    pageRangeDisplayed={5}
                                    onChange={_handlePageChange}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    innerClass="pagination text-center"
                                /> 
                            </div> 
                        : ''} 
                    </div>
                </div>
            </div>

            {/* delete pop up modal */}
            {showModal ? (<Modal 
                            showModal={showModal} 
                            handleModalClose={_handleModalCloseClick} 
                            updateData={_deleteUserData}
                            modalTitle="Delete Record"
                            modalBody="Are you sure you wish to perform this action? This action is irreversible!"
            />) : null}
        </Fragment>
    )
}
