import React from 'react';
import {Row, Col} from 'reactstrap'
import Page from "../../components/layout/Page";

const NotFoundPage = () => {
    return (
        <Page content={(
            <Row className="min-vh-100 align-items-center">
                <Col xs="12" className="text-center">
                    <img src="/images/notfound.png" className="w-50"/>
                </Col>
            </Row>
        )}/>
    );
};

export default NotFoundPage;