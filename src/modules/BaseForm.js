import {Component} from 'react';
import _ from 'lodash';
import {Form} from '../components/helper/Form';

class BaseForm extends Component {

    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);
    }

    recaptchaCallback = (recaptchaToken) => {
        this.setState({
            g_recaptcha_response: recaptchaToken
        })
    }

    handleValueChange(field, event) {
        let form = this.state.form;

        if (event.target.type === 'checkbox') {
            if (event.target.className === 'custom-control-input') {
                form[field] = !!event.target.checked;
            } else {
                if (!!event.target.checked) {
                    form[field].push(event.target.value);
                } else {
                    _.remove(form[field], (value) => {
                        return value === event.target.value;
                    })
                }
            }
        } else {
            form[field] = !Form.empty(event.target.files) ? event.target.files[0] : event.target.value;
        }

        this.setState({form});
    }
}

export default BaseForm;