import React, {Component} from "react";
import PropTypes from 'prop-types';
import {loadReCaptcha, ReCaptcha} from "react-recaptcha-v3";
import {RECAPTCHA_SITE_KEY} from "../../config/recaptcha";

class Recaptcha extends Component {

    componentDidMount() {
        loadReCaptcha(this.props.siteKey);
    }

    render() {
        return (
            <ReCaptcha
                sitekey={this.props.siteKey}
                action={this.props.actionName}
                verifyCallback={this.props.verifyCallback}
            />
        );
    }
}

Recaptcha.propTypes = {
    siteKey: PropTypes.string,
    actionName: PropTypes.string.isRequired,
    verifyCallback: PropTypes.func.isRequired
};
Recaptcha.defaultProps = {
    siteKey: RECAPTCHA_SITE_KEY,
    actionName: "default_action",
    verifyCallback: function (token) {
        console.log(token);
    }
};

export default Recaptcha;