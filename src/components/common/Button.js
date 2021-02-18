import React from "react";
import _ from 'lodash';
import {Button as BaseButton} from 'reactstrap';

const Button = (props) => {
    const {
        loading,
        label,
        ...attributes
    } = props;

    _.unset(attributes, 'loading');
    _.unset(attributes, 'label');

    return !!loading
        ? <BaseButton type="button" disabled={true} color="default disabled">Memproses</BaseButton>
        : <BaseButton {...attributes}>{label}</BaseButton>;
};

export default Button;