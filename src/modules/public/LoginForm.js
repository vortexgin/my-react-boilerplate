import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Form, FormGroup, Label, Input} from 'reactstrap';
import BaseForm from "../BaseForm";
import Recaptcha from "../../components/common/Recaptcha";
import {loggedInUser} from "../../components/auth/AuthActions";
import Button from "../../components/common/Button";

class LoginForm extends BaseForm {

    constructor(props) {
        super(props);

        this.state = {
            g_recaptcha_response: "",
            loading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.persist();

        this.setState({loading: true}, () => {
            this.props.loggedInUser(
                event.target.elements.txtEmail.value,
                event.target.elements.txtPassword.value,
                this.state.g_recaptcha_response
            ).then(response => {
                this.setState({loading: false}, () => {
                    this.props.onSubmit(response);
                });
            });
        })
    }

    render() {
        return (
            <Form id="form-login" role="form" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="txtEmail">NIP</Label>
                    <Input type="text" id="txtEmail" placeholder="123456"/>
                </FormGroup>
                <FormGroup>
                    <Label for="txtPassword">Password</Label>
                    <Input type="password" id="txtPassword"/>
                </FormGroup>
                <FormGroup className="text-right">
                    <Button color="primary" label="Login" loading={this.state.loading}/>
                </FormGroup>
                <Recaptcha actionName="form_login" verifyCallback={this.recaptchaCallback}/>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func
};
LoginForm.defaultProps = {
    onSubmit: () => {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loggedInUser
    }, dispatch);
}


export default connect(null, mapDispatchToProps)(LoginForm);
