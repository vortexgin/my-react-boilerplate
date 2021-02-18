import React, {Component} from 'react';
import {
    Navbar, NavbarBrand, NavbarToggler,
    Collapse,
} from "reactstrap";
import MenuPublic from "./MenuPublic";
import MenuTop from "./MenuTop";

const defaultProps = {
    navMenu: <MenuPublic/>
};

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topOpen: false,
            sidebarOpen: false,
        };

        this.toggleTop = this.toggleTop.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleTop() {
        this.setState({
            topOpen: !this.state.topOpen
        });
    }

    toggleSidebar() {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar expand="md" fixed="top">
                    <button className={"hamburger hamburger--spring" + (!!this.state.sidebarOpen ? " is-active" : "")}
                            type="button" onClick={this.toggleSidebar}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                    <NavbarBrand href="/" className="pb-0">
                        <img src="/logo.png" alt="logo mie" className="mr-2" style={{height: '40px'}}/>
                        myInternal Events
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleTop}/>
                    <Collapse isOpen={this.state.topOpen} navbar>
                        <MenuTop/>
                    </Collapse>
                </Navbar>
                <Navbar className={"sidebar" + (!this.state.sidebarOpen ? " collapsed" : "")}>
                    {this.props.navMenu}
                </Navbar>
            </div>
        )
    }
}

Header.defaultProps = defaultProps;
export default Header;