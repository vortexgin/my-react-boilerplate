import React, {Component} from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import Select from "./Select";

class SelectArray extends Component {

    constructor(props) {
        super(props);

        this.state = {
            array: !_.isEmpty(props.defaultValue) ? props.defaultValue : []
        };

        this.handleAddArray = this.handleAddArray.bind(this);
        this.handleRemoveArray = this.handleRemoveArray.bind(this);
        this.handleChangeArray = this.handleChangeArray.bind(this);
    }

    handleAddArray(e) {
        e.preventDefault();

        let array = this.state.array;
        array.push("");

        this.setState({array}, () => {
            if (_.isFunction(this.props.onChange)) this.props.onChange({target: {type: 'add-array', value: null}}, array);
        });
    }

    handleRemoveArray(index) {
        let array = this.state.array;
        _.pullAt(array, [index]);

        this.setState({array}, () => {
            if (_.isFunction(this.props.onChange)) this.props.onChange({target: {type: 'remove-array', value: null}}, array);
        });
    }

    handleChangeArray(index, select) {
        let array = this.state.array;
        const value = _.isObject(select) ? select.target.value : select;
        array[index] = value;

        this.setState({array}, () => {
            if (_.isFunction(this.props.onChange)) this.props.onChange({target: {type: 'react-select', value}}, array);
        });

    }

    render() {
        return <div>
            {
                this.state.array.map((value, index) => {
                    const defaultValue = _.isArray(this.props.defaultValue) ? this.props.defaultValue[index] : this.props.defaultValue;
                    return <Row className="mb-3" key={`input-array-${index}`}>
                        <Col xs={11}>
                            <Select
                                {...this.props}
                                defaultValue={defaultValue}
                                onChange={(event) => {
                                    this.handleChangeArray(index, event.target.value)
                                }}
                            />
                        </Col>
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
}

SelectArray.propTypes = {
    options: PropTypes.array,
    multiple: PropTypes.bool,
    mandatory: PropTypes.bool,
    disabled: PropTypes.bool,
    async: PropTypes.bool,
    source: PropTypes.func,
    max: PropTypes.number,
    path: PropTypes.string,
    fieldvalue: PropTypes.string,
    fieldvaluetype: PropTypes.string,
    fieldlabel: PropTypes.string,
};
SelectArray.defaultProps = {
    options: [],
    multiple: false,
    disabled: false,
    mandatory: false,
    async: false,
    source: null,
    max: 5,
    path: '',
    fieldvalue: 'id',
    fieldvaluetype: 'string',
    fieldlabel: 'id',
};

export default SelectArray;
