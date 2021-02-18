import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {Container} from 'reactstrap';
import PropTypes from "prop-types";

const propTypes = {
    className: PropTypes.string,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    header: PropTypes.element
};
const defaultProps = {
    content: 'This is content',
    header: <Header/>
};
const PageNav = (props) => {
    const {
        className,
        content,
        header
    } = props;

    return (
        <div>
            {header}
            <Container className={`${className}`} style={{marginTop: '70px'}}>
                {content}
            </Container>
            <Footer
                facebook="https://www.facebook.com/vortexgin"
                twitter="https://twitter.com/vortexgin"
                linkedin="https://id.linkedin.com/in/vortexgin"
            />
        </div>
    );
};

PageNav.propTypes = propTypes;
PageNav.defaultProps = defaultProps;

export default PageNav;