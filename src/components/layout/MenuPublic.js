import React from "react";
import {
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

const MenuPublic = () => (
    <Nav className="ml-auto" navbar>
        <NavItem>
            <NavLink href="/components/">Components</NavLink>
        </NavItem>
    </Nav>
);

export default MenuPublic;