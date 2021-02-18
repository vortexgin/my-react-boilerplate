import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from 'lodash';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

class ActionGroup extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            !!this.props.handleUpdate || !!this.props.handleDelete || !_.isEmpty(this.props.otherButton)
                ? <ButtonDropdown className="float-right" isOpen={this.state.dropdownOpen}
                                  toggle={this.toggle} {...this.props.buttonDropdownAttributes}>
                    <DropdownToggle size="sm" color="default" {...this.props.dropdownAttributes}>
                        {this.props.title}
                    </DropdownToggle>
                    <DropdownMenu style={{left: 'unset', right: 0}} {...this.props.dropdownMenuAttributes}>
                        {this.props.otherButton.map(item => {
                            return item;
                        })}
                        {
                            !!this.props.handleUpdate &&
                            <DropdownItem key={`action-update-${this.props.id}`} onClick={e => {
                                this.props.handleUpdate(this.props.id)
                            }}>
                                {this.props.titleUpdate}
                            </DropdownItem>
                        }
                        {
                            !!this.props.handleDelete &&
                            <DropdownItem key={`action-delete-${this.props.id}`} onClick={e => {
                                this.props.handleDelete(this.props.id)
                            }}>
                                {this.props.titleDelete}
                            </DropdownItem>
                        }
                    </DropdownMenu>
                </ButtonDropdown>
                : null
        );
    }
}

ActionGroup.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    titleUpdate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleUpdate: PropTypes.func,
    titleDelete: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    handleDelete: PropTypes.func,
    otherButton: PropTypes.array,
    buttonDropdownAttributes: PropTypes.object,
    dropdownAttributes: PropTypes.object,
    dropdownMenuAttributes: PropTypes.object
};
ActionGroup.defaultProps = {
    title: "Action",
    titleUpdate: "Update",
    titleDelete: "Delete",
    otherButton: [],
    buttonDropdownAttributes: {},
    dropdownAttributes: {
        caret: true
    },
    dropdownMenuAttributes: {},
};

export default ActionGroup;