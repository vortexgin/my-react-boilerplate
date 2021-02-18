import React from 'react';
import {Container} from 'reactstrap';

const defaultProps = {
    className: '',
    content: 'This is content'
};
const Page = (props) => {
    const {
        className,
        content,
    } = props;

    return (
        <Container className={className}>
            {content}
        </Container>
    );
};

Page.defaultProps = defaultProps;

export default Page;