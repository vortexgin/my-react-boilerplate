import React from 'react';
import {Row, Col} from 'reactstrap'
import Page from "../../components/layout/Page";
import PageNav from "../../components/layout/PageNav";
import Header from "../../components/layout/Header";
import MenuCMS from "../../components/layout/MenuCMS";

const UnauthorizedPage = () => {
    return (
        <PageNav content={(
            <Row className="min-vh-100">
                <Page content={(
                    <Row className="min-vh-100 align-items-center">
                        <Col xs="12" className="text-center">
                            <img src="/images/forbidden.png" alt="Unauthorized page" className="w-50"/>
                        </Col>
                    </Row>
                )}/>
            </Row>
        )} header={<Header navMenu={<MenuCMS/>}/>} className="cms"/>
    );
};

export default UnauthorizedPage;