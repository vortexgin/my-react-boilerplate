import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from 'lodash';
import {Button, Col, Input, Row} from "reactstrap";
import ActionGroup from "../../../components/common/ActionGroup";
import Popup from 'react-popup';
import ReactPlaceholder from "react-placeholder";
import {toast} from "react-toastify";
import TableAdmin from "../../../components/common/TableAdmin";
import UserForm from "../../../modules/dashboard/user/UserForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload, faDownload} from "@fortawesome/free-solid-svg-icons";
import {default as CustomInput} from "../../../components/common/Input";
import UserRoleForm from "../../../modules/dashboard/user/UserRoleForm";
import AccessControl from "../../../components/auth/AccessControl";
import {BACKEND_ENDPOINT, ROLE_ADMIN, ROLE_SUPER_ADMIN} from "../../../config/app";
import DataLoader from "../../../components/common/DataLoader";
import {deleteUser, getUser, getUsers, importUser} from "./UserActions";
import {_getAccessToken} from "../../../components/auth/AuthActions";

class ListPage extends Component {


    constructor(props) {
        super(props);

        this.state = {
            reloadTable: false
        };

        this.importFile = React.createRef();

        this.handleResponse = this.handleResponse.bind(this);
        this.handleActionAdd = this.handleActionAdd.bind(this);
        this.handleOpenFileBrowser = this.handleOpenFileBrowser.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleActionUpdate = this.handleActionUpdate.bind(this);
        this.handleActionUpdateRole = this.handleActionUpdateRole.bind(this);
        this.handleActiveChange = this.handleActiveChange.bind(this);
        this.handleActionDelete = this.handleActionDelete.bind(this);
        this.handleExport = this.handleExport.bind(this);
    }

    handleResponse(response) {
        if (_.includes([201, 202, 204], response.status)) {
            if (response.status === 201) {
                toast.success('User has been created')
            } else if (response.status === 202) {
                toast.success('User has been updated')
            } else if (response.status === 204) {
                toast.success('User has been deleted')
            }

            this.props.getUsers();
            Popup.close();
        }
    }

    handleActionAdd() {
        Popup.create({
            title: 'Create a new user',
            content: <UserForm onSubmit={this.handleResponse}/>
        });
    }

    handleOpenFileBrowser() {
        this.importFile.current.click();
    }

    handleImport(event) {
        if (!_.isEmpty(event.target.files) && !!event.target.files[0]) {
            Popup.create({
                title: 'Loading',
                content: <Row>
                    <Col xs={12} className="text-center my-5">
                        <ReactPlaceholder className="mx-auto" customPlaceholder={<DataLoader/>}/>
                    </Col>
                </Row>
            });

            this.props.importUser({file: event.target.files[0]})
                .then(response => {
                    Popup.close();
                    if (response.status === 200) {
                        if (response.data.data.failed.length > 0) {
                            let failedReport = '';
                            response.data.data.failed.map(fail => {
                                failedReport += "Line " + fail + " failed \n";
                                return true;
                            })
                            Popup.create({
                                title: 'Import result',
                                content: <Input type="textarea" className="w-100" style={{height: '200px'}}
                                                value={failedReport}/>
                            });
                        } else {
                            this.props.getUsers();
                        }
                    } else {
                        if (response.hasOwnProperty('message')) {
                            toast.error(response.message);
                        }
                    }
                })
        }
    }

    handleExport() {
        window.open(BACKEND_ENDPOINT + `/ganesha/user/export?_at=` + _getAccessToken());
    }

    handleActionUpdate(id) {
        this.props.getUser(id)
            .then(response => {
                if (response.status === 200) {
                    Popup.create({
                        title: 'Update user',
                        content: <UserForm
                            onSubmit={this.handleResponse}
                            form={{
                                ...response.data.data,
                                id: parseInt(response.data.data.id),
                            }}
                        />
                    });
                }
            });
    }

    handleActionUpdateRole(id) {
        this.props.getUser(id)
            .then(response => {
                if (response.status === 200) {
                    Popup.create({
                        title: 'Update user',
                        content: <UserRoleForm
                            onSubmit={this.handleResponse}
                            form={{
                                ...response.data.data,
                                id: parseInt(response.data.data.id),
                            }}
                        />
                    });
                }
            });
    }

    handleActionDelete(id) {
        Popup.create({
            title: "Delete data!",
            content: "Are you sure to delete this data?",
            buttons: {
                right: [{
                    text: "No",
                    action: () => {
                        Popup.close();
                    }
                }, {
                    text: "Yes",
                    className: "danger",
                    action: () => {
                        this.props.deleteUser(id)
                            .then(response => {
                                this.handleResponse(response);
                            })
                    }
                }]
            }
        });
    }

    render() {
        const columns = [
            {Header: "ID", accessor: "id"},
            {Header: "Name", accessor: "name"},
            {Header: "NIP", accessor: "username"},
            {Header: "Roles", accessor: "roles", filterable: false, sortable: false},
            {
                Header: "Action",
                accessor: "id",
                Cell: props => {
                    return (
                        <ActionGroup
                            id={props.value}
                            handleUpdate={this.handleActionUpdate}
                            handleDelete={this.handleActionDelete}
                        />
                    )
                },
                filterable: false,
                sortable: false,
                className: "text-right",
                style: {overflow: "unset"}
            },
        ];

        return (
            <AccessControl role={[ROLE_SUPER_ADMIN, ROLE_ADMIN]} type="page">
                <div className="w-100 p-4">
                    <h2 className="mb-4">
                        Master User
                        <Button className="float-right ml-2" size="sm" onClick={this.handleExport}>
                            <FontAwesomeIcon icon={faDownload}/> Download
                        </Button>
                        <Button className="float-right ml-2" size="sm" onClick={this.handleOpenFileBrowser}>
                            <FontAwesomeIcon icon={faUpload}/> Upload
                        </Button>
                        <Button className="float-right" size="sm" onClick={() => {
                            this.handleActionAdd()
                        }}><i className="far fa-plus"></i> Create</Button>
                        <CustomInput
                            id="import-file"
                            type="file"
                            className="d-none"
                            ref={this.importFile}
                            onChange={this.handleImport}/>
                    </h2>
                    <TableAdmin
                        data={this.props.gridUser}
                        meta={this.props.metaUser}
                        columns={columns}
                        fetchData={this.props.getUsers}
                        reload={this.state.reloadTable}
                        onReload={() => {
                            this.setState({reloadTable: false})
                        }}
                    />
                </div>
            </AccessControl>
        );
    }
}

function mapStateToProps(state) {
    return {
        gridUser: state.UserReducer.gridUser,
        metaUser: state.UserReducer.metaUser
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers,
        getUser,
        importUser,
        deleteUser,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);