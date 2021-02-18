import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Form, FormGroup} from "reactstrap";
import BaseForm from "../../BaseForm";
import Recaptcha from "../../../components/common/Recaptcha";
import Button from "../../../components/common/Button";
import Select from "../../../components/common/Select";
import {updateUserRole} from "../../../containers/dashboard/user/UserActions";
import {USER_ROLES} from "../../../config/app";

class UserRoleForm extends BaseForm {

    constructor(props) {
        super(props);

        this.state = {
            g_recaptcha_response: '',
            errors: {},
            loading: false,
            form: props.form ? props.form : {
                id: null,
                role: null,
            },
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({loading: true}, () => {
            this.props.updateUserRole(this.state.form.id, this.state.form.role, this.state.g_recaptcha_response)
                .then(response => {
                    this.setState({loading: false}, () => {
                        this.props.onSubmit(response);
                    });
                })
        });
    }

    render() {
        return (
            <Form id='form-user-role' role='form' onSubmit={this.handleSubmit}>
                <Select id="role" name="role" label="Role"
                        mandatory={true} options={USER_ROLES} defaultValue={this.state.form.role}
                        errors={this.state.errors}
                        onChange={(event) => this.handleValueChange('role', event)}/>
                <FormGroup className="text-right">
                    <Button color="primary" label="Save" loading={this.state.loading}/>
                </FormGroup>
                <Recaptcha actionName='form_user_role' verifyCallback={this.recaptchaCallback}/>
            </Form>
        );
    }
}

UserRoleForm.propTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
};

UserRoleForm.defaultProps = {
    onSubmit: () => {
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateUserRole,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserRoleForm);