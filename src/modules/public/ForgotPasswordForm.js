import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import BaseForm from "../BaseForm";
import Recaptcha from "../../components/common/Recaptcha";
import Button from "../../components/common/Button";

class ForgotPasswordForm extends BaseForm {

    constructor(props) {
        super(props);

        this.state = {
            g_recaptcha_response: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (event) => {
        event.preventDefault();
        // need to implement here
    }

    render() {
        return (
            <Form id="form-forgot-password" role="form" onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="txtEmail">Email address</Label>
                    <Input type="email" id="txtEmail" placeholder="mail@example.com"/>
                </FormGroup>
                <FormGroup className="text-right">
                    <Button color="primary" label="Submit" loading={this.props.formSendFeedbackProcess}/>
                </FormGroup>
                <FormGroup className="mt-4 text-right">
                    <Link to="/register">Don't have an account? register here</Link>
                </FormGroup>
                <Recaptcha actionName="form_forgot_password" verifyCallback={this.recaptchaCallback}/>
            </Form>
        );
    }
}

ForgotPasswordForm.propTypes = {
    onSubmit: PropTypes.func
};

export default ForgotPasswordForm;