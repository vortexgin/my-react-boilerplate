import React, {Component} from 'react';
import {Row} from 'reactstrap'
import PageNav from "../../components/layout/PageNav";
import Header from "../../components/layout/Header";
import MenuCMS from "../../components/layout/MenuCMS";
import DashboardRouter from "./DashboardRouter";

class DashboardPage extends Component {
    render() {
        return (
            <PageNav content={(
                <Row className="min-vh-100">
                    <DashboardRouter/>
                </Row>
            )} header={<Header navMenu={<MenuCMS/>}/>} className="cms"/>
        );
    }
}

export default DashboardPage;