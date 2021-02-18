import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';
import {FormGroup, Label, Input} from "reactstrap";
import {requiredText} from "../styles/elements";

const InputElement = (props) => {
    const {
        tag,
        id,
        type,
        label,
        required,
        disabled,
        mandatory,
        errors,
        fileEmbed,
        classLabel,
        classFormGroup,
        onDeleteEmbedFile
    } = props;

    const mime = require('mime-types');
    return (
        <FormGroup className={classFormGroup}>
            {type !== 'switch' && !!label ?
                <Label for={id} className={classLabel}>{label} {required || mandatory ? requiredText : ''}</Label> : ''}
            {tag}
            {!!errors && errors.hasOwnProperty(id) ? errors[id].map((error, index) => {
                return <span className="badge badge-danger" key={`fields-${id}-errors-${index}`}>{error}</span>
            }) : ''}
            {
                type === 'file' && !_.isEmpty(fileEmbed) &&
                (
                    _.startsWith(mime.lookup(fileEmbed), 'image')
                        ? (
                            <div>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            disabled={disabled}
                                            onChange={onDeleteEmbedFile}
                                        /> Delete image
                                    </Label>
                                </FormGroup>
                                <img
                                    src={fileEmbed}
                                    className="img-thumbnail img-fluid"
                                    style={{height: '250px'}}
                                    alt="View file"
                                />
                            </div>
                        )
                        : (
                            <div>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            disabled={disabled}
                                            onChange={onDeleteEmbedFile}
                                        /> Delete file
                                    </Label>
                                </FormGroup>
                                <a href={fileEmbed} target="_blank" rel="noopener noreferrer">Buka file di tab baru</a>
                            </div>
                        )
                )

            }
        </FormGroup>
    );
};

InputElement.propTypes = {
    tag: PropTypes.element.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    mandatory: PropTypes.bool,
    errors: PropTypes.object,
    fileEmbed: PropTypes.string,
    onDeleteEmbedFile: PropTypes.func,
};
InputElement.defaultProps = {
    label: false,
    required: false,
    disabled: false,
    mandatory: false,
    errors: {},
    onDeleteEmbedFile: () => {
    }
};

export default InputElement;