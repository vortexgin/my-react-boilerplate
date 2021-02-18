import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import {Form, FormGroup, Label, Badge} from 'reactstrap';
import BaseForm from "../BaseForm";
import Recaptcha from "../../components/common/Recaptcha";
import {sendFeedback} from "../../containers/dashboard/DashboardActions";
import Button from "../../components/common/Button";

class SendFeedbackForm extends BaseForm {

    constructor(props) {
        super(props);

        this.state = {
            g_recaptcha_response: "",
            feedback: "",
            errors: {},
            loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(content) {
        this.setState({feedback: content});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({loading: true}, () => {
            this.props.sendFeedback(this.state.feedback, this.state.g_recaptcha_response)
                .then(response => {
                    this.setState({loading: false}, () => {
                        this.props.handleSubmit(response);
                    });
                });
        });
    }

    render() {
        return (
            <Form id="form-send-feedback" role="form" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="feedback" className="mb-4">Do you have any feedback or product-related issue that you
                        would like to report?</Label>
                    <ReactQuill
                        theme="snow"
                        id="feedback"
                        placeholder="Share your feedback or product-related issue here"
                        modules={{
                            toolbar: {
                                container: ['bold', 'italic', 'underline', {list: 'ordered'}, {list: 'bullet'}, 'clean'],
                            },
                            keyboard: {
                                bindings: {
                                    tab: false,
                                }
                            }
                        }}
                        formats={[
                            'bold', 'italic', 'underline',
                            'strike', 'list', 'bullet'
                        ]}
                        onChange={this.handleChange}
                    />
                    {
                        this.state.errors.hasOwnProperty('feedback') &&
                        <Badge className="badge-error">{this.state.errors.feedback}</Badge>
                    }
                </FormGroup>
                <FormGroup className="text-right">
                    <Button color="primary" label="Save" loading={this.state.loading}/>
                </FormGroup>
                <Recaptcha actionName="form_send_feedback" verifyCallback={this.recaptchaCallback}/>
            </Form>
        );
    }
}

SendFeedbackForm.propTypes = {
    handleSubmit: PropTypes.func
};

SendFeedbackForm.defaultProps = {
    handleSubmit: () => {
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        sendFeedback
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(SendFeedbackForm);
