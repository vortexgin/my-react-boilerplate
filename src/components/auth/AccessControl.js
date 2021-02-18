import PropType from 'prop-types';
import {isAuthFor} from "./AuthActions";
import React from "react";
import {Redirect} from "react-router-dom";

const AccessControl = (props) => {
    const {
        type,
        role
    } = props;

    if (!isAuthFor(role)) {
        if (type === 'page') {
            return <Redirect to="/unauthorized"/>;
        } else {
            return null;
        }
    }

    return props.children;
}

AccessControl.propTypes = {
    role: PropType.oneOfType([PropType.string, PropType.array]).isRequired,
    type: PropType.string
};

export default AccessControl;