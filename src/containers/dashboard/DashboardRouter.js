import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import {asyncComponent} from "../../components/helper/AsyncFunc";

const routes = [
    {
        path: 'statistic',
        component: asyncComponent(() => import('./statistic/DetailPage'))
    },
    {
        path: 'user',
        component: asyncComponent(() => import('./user/ListPage'))
    }
];

class DashboardRouter extends Component {

    render() {
        return (
            <Switch>
                {routes.map(route => {
                    const {path, exact, ...otherProps} = route;
                    return (
                        <Route exact={exact !== false}
                               path={`/dashboard/${path}`}
                               key={`$(path)`} {...otherProps} />
                    );
                })}
                <Route component={asyncComponent(() => import('../exception/NotFoundPage'))}/>
            </Switch>
        );
    }
}

export default DashboardRouter;