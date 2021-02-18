import React from "react";
import PropTypes from 'prop-types';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import BaseForm from "../BaseForm";
import Recaptcha from "../../components/common/Recaptcha";
import {Link} from "react-router-dom";
import Button from "../../components/common/Button";

const propTypes = {
    onSubmit: PropTypes.func.isRequired
};

class RegisterForm extends BaseForm {

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
            <Form id="form-register" role="form" onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="txtName">Full name</Label>
                    <Input type="text" id="txtName" placeholder="John Doe"/>
                </FormGroup>
                <FormGroup>
                    <Label for="txtEmail">Email address</Label>
                    <Input type="text" id="txtEmail" placeholder="mail@example.com"/>
                </FormGroup>
                <FormGroup>
                    <Label for="txtPassword">Password</Label>
                    <Input type="password" id="txtPassword"/>
                </FormGroup>
                <FormGroup className="text-right">
                    <Button color="primary" label="Submit" loading={this.props.formSendFeedbackProcess}/>
                </FormGroup>
                <FormGroup className="mt-4 text-right">
                    <Link to="/login">Have an account? login here</Link>
                </FormGroup>
                <Recaptcha actionName="form_register" verifyCallback={this.recaptchaCallback}/>
            </Form>
        );
    }
}

RegisterForm.propTypes = propTypes;

export default RegisterForm;