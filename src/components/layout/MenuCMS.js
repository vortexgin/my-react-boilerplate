import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import jwt_decode from "jwt-decode";
import {NavLink} from "react-router-dom";
import {
    DropdownItem, DropdownMenu, DropdownToggle,
    Nav, NavItem, UncontrolledDropdown, Row, Col
} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faTachometerAlt, faTools, faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import Popup from "react-popup";
import SendFeedbackForm from "../../modules/dashboard/SendFeedbackForm";
import AccessControl from "../auth/AccessControl";
import {ROLE_ADMIN, ROLE_MERCHANT, ROLE_SUPER_ADMIN, ROLE_USER} from "../../config/app";
import {_getAccessToken, _removeAccessToken, isAuthFor} from "../auth/AuthActions";

class MenuCMS extends Component {

    constructor(props) {
        super(props);

        this.handleSendFeedback = this.handleSendFeedback.bind(this);
    }

    handleLogout() {
        _removeAccessToken();
        window.location.href = '/login';
    }

    handleSubmitFeedback(response) {
        if (!!response) {
            Popup.close();
        }
    }

    handleSendFeedback() {
        Popup.create({
            className: 'confirmation',
            title: 'Send feedback',
            content: <SendFeedbackForm handleSubmit={this.handleSubmitFeedback}/>,
            buttons: {},
        });
    }

    render() {
        const iconSpace = {marginRight: '8px'};

        const menuMaster = {
            'User': '/dashboard/user',
        };

        return (
            <Col>
                <Row>
                    <AccessControl role={[ROLE_SUPER_ADMIN, ROLE_ADMIN]}>
                        <Nav className="w-100 mt-4 top" navbar>
                            <NavItem>
                                <NavLink to="/dashboard/statistic" className="nav-link p-3 font-size-md">
                                    <FontAwesomeIcon icon={faTachometerAlt} style={iconSpace}/> Dashboard
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </AccessControl>
                    <Nav className="w-100 mt-4 bottom" navbar>
                        <AccessControl role={[ROLE_SUPER_ADMIN, ROLE_ADMIN]}>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="p-3 font-size-md">
                                    <FontAwesomeIcon icon={faTools} style={iconSpace}/> Master data
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {
                                        Object.keys(menuMaster).map(title => {
                                            return <AccessControl
                                                role={title === 'User' ? [ROLE_SUPER_ADMIN, ROLE_USER] : ROLE_SUPER_ADMIN}>
                                                <DropdownItem key={`master-menu-${title}`}>
                                                    <a className="nav-link font-size-md py-1"
                                                       href={menuMaster[title]}>{title}</a>
                                                </DropdownItem>
                                            </AccessControl>
                                        })
                                    }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </AccessControl>
                        <NavItem>
                            <button onClick={this.handleSendFeedback} className="nav-link p-3 font-size-md">
                                <FontAwesomeIcon icon={faPaperPlane} style={iconSpace}/> Send feedback
                            </button>
                        </NavItem>
                    </Nav>
                </Row>
            </Col>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.AuthReducer.isAuthenticated,
        activeUser: state.AuthReducer.activeUser
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCMS);