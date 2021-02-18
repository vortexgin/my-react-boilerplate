import React, {Component} from 'react';
import {Row, Col} from 'reactstrap'
import Page from "../../components/layout/Page";
import ForgotPasswordForm from "../../modules/public/ForgotPasswordForm";

class ForgotPasswordPage extends Component {
    render() {
        return (
            <Page content={(
                <Row className="min-vh-100 align-items-center">
                    <Col xs={12} sm={6} lg={4} xl={3} className="ml-auto mr-4 bg-light p-4">
                        <ForgotPasswordForm/>
                    </Col>
                </Row>
            )}/>
        );
    }
}

export default ForgotPasswordPage;