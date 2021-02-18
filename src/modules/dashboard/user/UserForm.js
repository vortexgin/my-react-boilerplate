import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {Form, FormGroup, Card, CardHeader, CardBody} from 'reactstrap';
import BaseForm from '../../BaseForm';
import Recaptcha from '../../../components/common/Recaptcha';
import Select from '../../../components/common/Select';
import Input from '../../../components/common/Input';
import Button from "../../../components/common/Button";
import {Form as FormHelper} from '../../../components/helper/Form';
import {ROLE_USER, USER_ROLES} from '../../../config/app';
import {createUser, updateUser} from "../../../containers/dashboard/user/UserActions";
import {isEmail} from "../../../components/helper/utils";

class UserForm extends BaseForm {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 1,
            g_recaptcha_response: '',
            errors: {},
            loading: false,
            form: props.form ? props.form : {
                id: null,
                email: null,
                username: null,
                password: null,
                role: ROLE_USER,
                name: null,
                position: null,
                phone: null,
                dob: null,
            },
        };

        this.setActiveTab = this.setActiveTab.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(this.props.formUserErrors, prevProps.formUserErrors)) {
            this.setState({errors: this.props.formUserErrors});
        }
    }

    setActiveTab(tab) {
        let errors = {};
        if (tab === 2) {
            const fieldsToCheck = FormHelper.empty(this.state.form.id) ? ['email', 'username', 'password', 'role'] : ['email', 'username', 'role'];
            fieldsToCheck.map((field) => {
                if (FormHelper.empty(this.state.form[field])) {
                    errors[field] = ['This field cannot be blank'];
                } else if (field === 'email' && !isEmail(this.state.form[field])) {
                    errors[field] = ['Invalid email address'];
                }
                return true;
            });
        }

        if (_.isEmpty(errors)) {
            this.setState({activeTab: tab});
        } else {
            this.setState({errors});
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({loading: true}, () => {
            if (!FormHelper.empty(this.state.form.id)) {
                this.props.updateUser(this.state.form.id, this.state.form, this.state.g_recaptcha_response).then(response => {
                    this.setState({loading: false}, () => {
                        this.props.onSubmit(response);
                    });
                });
            } else {
                this.props.createUser(this.state.form, this.state.g_recaptcha_response).then(response => {
                    this.setState({loading: false}, () => {
                        this.props.onSubmit(response);
                    });
                });
            }
        });
    }

    render() {
        return (
            <Form id='form-user' role='form' onSubmit={this.handleSubmit}>
                <Card className={`mb-4 ` + (this.state.activeTab === 1 ? '' : 'd-none')}>
                    <CardHeader>Informasi Akun</CardHeader>
                    <CardBody>
                        <Input type='email' id='email' name='email' label='Email address' placeholder='mail@example.com'
                               mandatory={true} defaultValue={this.state.form.email} errors={this.state.errors}
                               onChange={(event) => this.handleValueChange('email', event)}/>
                        <Input type='text' id='username' name='username' label='NIP' placeholder='123456'
                               mandatory={true} defaultValue={this.state.form.username} errors={this.state.errors}
                               onChange={(event) => this.handleValueChange('username', event)}/>
                        <Input type='text' id='password' name='password' label='Password'
                               mandatory={true} errors={this.state.errors}
                               onChange={(event) => this.handleValueChange('password', event)}/>
                        <Select id='role' name='role' label='Role'
                                options={USER_ROLES} mandatory={true} defaultValue={this.state.form.role}
                                errors={this.state.errors}
                                onChange={(event) => this.handleValueChange('role', event)}/>
                        <FormGroup className='text-right mb-0'>
                            <Button color='success' label="Selanjutnya" onClick={() => this.setActiveTab(2)}/>
                        </FormGroup>
                    </CardBody>
                </Card>
                <Card className={`mb-4 ` + (this.state.activeTab === 2 ? '' : 'd-none')}>
                    <CardHeader>Data Diri</CardHeader>
                    <CardBody>
                        <Input type='text' id='name' name='name' label='Name'
                               defaultValue={this.state.form.name} errors={this.state.errors}
                               onChange={(event) => this.handleValueChange('name', event)}/>
                        <Input type='text' id='position' name='position' label='Position'
                               defaultValue={this.state.form.position} errors={this.state.errors}
                               onChange={(event) => this.handleValueChange('position', event)}/>
                        <Input type='tel' id='phone' name='phone' label='Phone number'
                               defaultValue={this.state.form.phone} errors={this.state.errors}
                               onChange={(event) => this.handleValueChange('phone', event)}/>
                        <FormGroup className='text-right mb-0'>
                            <Button color='link' label="Sebelumnya" className='float-left'
                                    onClick={() => this.setActiveTab(1)}/>
                            <Button color="primary" label="Save" loading={this.state.loading}/>
                        </FormGroup>
                    </CardBody>
                </Card>
                <Recaptcha actionName='form_user' verifyCallback={this.recaptchaCallback}/>
            </Form>
        );
    }
}

UserForm.propTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
};

UserForm.defaultProps = {
    onSubmit: () => {
    }
};

function mapStateToProps(state) {
    return {
        formUserErrors: state.UserReducer.formUserErrors
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createUser,
        updateUser,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);