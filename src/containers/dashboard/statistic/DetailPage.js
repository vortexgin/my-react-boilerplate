import React, {Component} from "react";
import AccessControl from "../../../components/auth/AccessControl";
import {ROLE_ADMIN, ROLE_SUPER_ADMIN} from "../../../config/app";
import {Card, CardBody} from "reactstrap";

class DetailPage extends Component {

    render() {
        return (
            <AccessControl role={[ROLE_SUPER_ADMIN, ROLE_ADMIN]} type="page">
                <div className="w-100 p-4">
                    <Card>
                        <CardBody>
                            This is dashboard page
                        </CardBody>
                    </Card>
                </div>
            </AccessControl>
        );
    }
}

export default DetailPage;