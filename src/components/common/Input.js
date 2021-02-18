import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from 'lodash';
import {Row, Col, Input as BaseInput, CustomInput} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import InputElement from "./InputElement";

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: props.array === true && !_.isEmpty(props.defaultValue) ? props.defaultValue : []
        };

        this.inputElement = React.createRef();

        this.handleAddArray = this.handleAddArray.bind(this);
        this.handleRemoveArray = this.handleRemoveArray.bind(this);
        this.handleChangeArray = this.handleChangeArray.bind(this);
    }

    handleAddArray(e) {
        e.preventDefault();

        let array = this.state.array;
        array.push("");

        this.setState({array});
    }

    handleRemoveArray(index) {
        let array = this.state.array;
        _.pullAt(array, [index]);

        this.setState({array});
    }

    handleChangeArray(index, event) {
        let array = this.state.array;
        array[index] = event.target.value;

        if (_.isFunction(this.props.onChange)) this.props.onChange(event, array);

        this.setState({array: array});
    }

    click() {
        this.inputElement.current.click();
    }

    render() {
        const {
            id,
            name,
            type,
            className,
            errors,
            fileEmbed,
            async,
            array,
            custom,
            ...attributes
        } = this.props;

        _.unset(attributes, 'errors');
        _.unset(attributes, 'fileEmbed');
        _.unset(attributes, 'async');
        _.unset(attributes, 'array');
        _.unset(attributes, 'custom');

        if (type === 'file') _.unset(attributes, 'value');

        let inputTag = <BaseInput
            {...attributes}
            id={id}
            name={name}
            type={type}
            mandatory={attributes.mandatory ? attributes.mandatory.toString() : undefined}
            className={type === 'hidden' ? `${className} d-none` : className}
            innerRef={this.inputElement}
        />;
        if (custom === true) {
            inputTag = <CustomInput
                {...attributes}
                id={id}
                name={name}
                type={type}
                mandatory={attributes.mandatory ? attributes.mandatory.toString() : undefined}
                className={type === 'hidden' ? `${className} d-none` : className}
                innerRef={this.inputElement}
            />;
        }
        if (array === true) {
            inputTag = <div>
                {
                    this.state.array.map((value, index) => {
                        _.unset(attributes, 'defaultValue');

                        let arrayInputTag = <BaseInput
                            {...attributes}
                            id={`${id}_${index}`}
                            name={`${name}[${index}]`}
                            type={type}
                            mandatory={attributes.mandatory ? attributes.mandatory.toString() : undefined}
                            value={value}
                            onChange={(event) => {
                                this.handleChangeArray(index, event)
                            }}
                            className={type === 'hidden' ? `${className} d-none` : className}
                            innerRef={this.inputElement}
                        />;

                        if (custom === true) {
                            arrayInputTag = <CustomInput
                                {...attributes}
                                id={`${id}_${index}`}
                                name={`${name}[${index}]`}
                                type={type}
                                mandatory={attributes.mandatory ? attributes.mandatory.toString() : undefined}
                                className={type === 'hidden' ? `${className} d-none` : className}
                                innerRef={this.inputElement}
                            />;
                        }

                        return <Row className="mb-3" key={`input-array-${index}`}>
                            <Col xs={11}>{arrayInputTag}</Col>
                            {
                                value !== 0 &&
                                <Col xs={1}>
                                    <a href onClick={(e) => {
                                        e.preventDefault();
                                        this.handleRemoveArray(index)
                                    }}><FontAwesomeIcon icon={faMinus}/></a>
                                </Col>
                            }
                        </Row>
                    })
                }
                <a href onClick={this.handleAddArray}><FontAwesomeIcon icon={faPlus}/> Tambah input</a>
            </div>
        }

        return (
            <InputElement
                {...attributes}
                tag={inputTag}
                id={id}
                type={type}
                errors={errors}
                fileEmbed={fileEmbed}
            />
        );
    }
}

Input.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    fileEmbed: PropTypes.string,
    async: PropTypes.bool,
    array: PropTypes.bool,
};

export default Input;