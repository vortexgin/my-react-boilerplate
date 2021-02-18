import React, {Component} from "react";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import _ from 'lodash';
import {Input} from "reactstrap";
import InputElement from "./InputElement";
import AsyncSelect from 'react-select/async';
import isPlainObject from "react-redux/lib/utils/isPlainObject";
import {Form} from "../helper/Form";

let waitingInput;

class Select extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            options: [],
            array: props.array === true && !_.isEmpty(props.defaultValue) ? props.defaultValue : []
        };

        this.loadOptions = this.loadOptions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
    }

    componentDidMount() {
        let params = [];
        if (!Form.empty(this.props.defaultValue)) params.push({id: 'id', value: this.props.defaultValue});
        this.loadOptions(params);
    }

    loadOptions(search, actionType) {
        if (_.isFunction(this.props.source)) {
            this.setState({loading: true}, () => {
                this.props.source(search, 'id', 'desc', 1, this.props.max)
                    .then(response => {
                        if (response.status === 200) {
                            const data = _.get(response, this.props.path);
                            const options = data.map(object => {
                                const value = _.get(object, this.props.fieldvalue);
                                return {
                                    value: this.props.fieldvaluetype === 'number'
                                        ? parseInt(value)
                                        : value,
                                    label: _.get(object, this.props.fieldlabel),
                                }
                            })
                            this.setState({options});

                            if (!_.isEmpty(actionType) && actionType.hasOwnProperty('callback') && _.isFunction(actionType.callback)) {
                                actionType.callback(options);
                            }
                        }
                        this.setState({loading: false});
                    })
            })
        }
    }

    onChange(select, actionType) {
        if (actionType.action === 'clear') this.loadOptions([], {action: 'clear'});
        this.props.onChange({target: {type: 'react-select', value: _.isObject(select) ? select.value : select}});
    }

    onInputChange(value, callback) {
        clearTimeout(waitingInput);
        waitingInput = setTimeout(() => {
            this.loadOptions([{id: 'keyword', value}], {action: 'input-change', callback});
        }, 1000)
    }

    renderSelect() {
        const {
            options,
            multiple,
            mandatory,
            array,
            async,
            source,
            max,
            path,
            fieldvalue,
            fieldlabel,
            ...attributes
        } = this.props;

        _.unset(attributes, 'options');
        _.unset(attributes, 'multiple');
        _.unset(attributes, 'mandatory');
        _.unset(attributes, 'async');
        _.unset(attributes, 'source');
        _.unset(attributes, 'max');
        _.unset(attributes, 'path');
        _.unset(attributes, 'fieldvalue');
        _.unset(attributes, 'fieldlabel');

        const selectedValue = this.state.options.filter(option => option.value === attributes.defaultValue);
        if (!!attributes.disabled) {
            return (
                <div className="clearfix">
                    {
                        _.isEmpty(selectedValue) ? 'n/a' : selectedValue[0].label
                    }
                </div>
            )
        }

        return _.isFunction(source)
            ? <AsyncSelect
                defaultOptions={this.state.options}
                loadOptions={this.onInputChange}
                isLoading={this.state.loading}
                isMulti={false}
                isClearable={true}
                value={selectedValue}
                onChange={this.onChange}
            />
            : <Input type="select" {...multiple ? 'multiple' : ''} {...attributes}
                     mandatory={mandatory ? mandatory : undefined}>
                {options.map((item, key) =>
                    <option key={key}
                            value={isPlainObject(item) ? item.value : item}>
                        {!isPlainObject(item) ? item : item.hasOwnProperty('name') ? item.name : item.value}
                    </option>
                )}
            </Input>
    }

    render() {
        let inputTag = this.renderSelect(this.onChange);

        return (
            <InputElement tag={inputTag} {...this.props} />
        );
    }
}

Select.propTypes = {
    options: PropTypes.array,
    multiple: PropTypes.bool,
    mandatory: PropTypes.bool,
    disabled: PropTypes.bool,
    array: PropTypes.bool,
    async: PropTypes.bool,
    source: PropTypes.func,
    max: PropTypes.number,
    path: PropTypes.string,
    fieldvalue: PropTypes.string,
    fieldvaluetype: PropTypes.string,
    fieldlabel: PropTypes.string,
};
Select.defaultProps = {
    options: [],
    multiple: false,
    disabled: false,
    mandatory: false,
    array: false,
    async: false,
    source: null,
    max: 5,
    path: '',
    fieldvalue: 'id',
    fieldvaluetype: 'string',
    fieldlabel: 'id',
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Select);
