import React, {Component} from "react";
import {connect} from "react-redux";
import {Nav, NavLink} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {_recordLastPage, _removeAccessToken} from "../auth/AuthActions";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

class MenuTop extends Component {

    handleLogout() {
        _recordLastPage();
        _removeAccessToken();

        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);
    }

    render() {
        return (
            <Nav className="ml-auto" navbar>
                <NavLink onClick={this.handleLogout} className="text-light cursor-pointer">
                    {!!this.props.activeUser.name ? this.props.activeUser.name : 'n/a'}
                    <FontAwesomeIcon icon={faSignOutAlt} className="ml-2"/>
                </NavLink>
            </Nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.AuthReducer.isAuthenticated,
        activeUser: state.AuthReducer.activeUser
    };
}

export default connect(mapStateToProps, null)(MenuTop);