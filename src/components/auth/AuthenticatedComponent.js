import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";
import {_getAccessToken, validateToken} from "./AuthActions";
import {PAGE_LOGIN} from "../../config/app";

const propTypes = {
    authenticated: PropTypes.bool,
    component: PropTypes.element.isRequired
};

const defaultProps = {
    authenticated: false
};

class AuthenticatedComponent extends Component {

    checkToken() {
        this.props.validateToken();

        return _getAccessToken();
    }

    render() {
        const authenticated = this.props.authenticated || !!this.checkToken();
        return (
            <div>
                {authenticated ? this.props.component : <Redirect to={{
                    pathname: PAGE_LOGIN,
                    state: {from: this.props.location}
                }}/>}
            </div>
        );
    }
}

AuthenticatedComponent.propTypes = propTypes;
AuthenticatedComponent.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {
        authenticated: state.AuthReducer.isAuthenticated,
        activeUser: state.AuthReducer.activeUser, // TODO: to check permission role
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        validateToken
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);