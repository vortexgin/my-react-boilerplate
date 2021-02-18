import React, {Component} from 'react';
import {Row, Col} from 'reactstrap'
import LoginForm from "../../modules/public/LoginForm";
import Page from "../../components/layout/Page";
import {loggedInUser} from "../../components/auth/AuthActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class LoginPage extends Component {
    render() {
        return (
            <Page content={(
                <Row className="min-vh-100 align-items-center">
                    <Col xs={12} sm={6} lg={4} xl={3} className="ml-auto mr-4 bg-light p-4">
                        <LoginForm/>
                    </Col>
                </Row>
            )}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loggedInUser
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPage);