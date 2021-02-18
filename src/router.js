import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {connect} from 'react-redux';
import Popup from 'react-popup';
import {ToastContainer} from 'react-toastify';
import {asyncComponent} from './components/helper/AsyncFunc';
import AuthenticatedComponent from './components/auth/AuthenticatedComponent';

const RestrictedRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => <AuthenticatedComponent component={<Component {...props} />}/>}
    />
);

const propTypes = {
    history: PropTypes.object
};

class PublicRoutes extends Component {
    render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <ToastContainer autoClose={5000} toastClassName="container-toaster"
                                progressClassName="container-toaster-progress-bar"/>
                <Popup/>
                <Switch>
                    <Redirect exact from="/" to="/dashboard"/>
                    <Route exact path={'/login'}
                           component={asyncComponent(() => import('./containers/public/LoginPage'))}/>
                    <Route exact path={'/forgot-password'}
                           component={asyncComponent(() => import('./containers/public/ForgotPasswordPage'))}/>
                    <Route exact path={'/register'}
                           component={asyncComponent(() => import('./containers/public/RegisterPage'))}/>
                    <RestrictedRoute path="/dashboard"
                                     component={asyncComponent(() => import('./containers/dashboard/DashboardPage'))}/>
                    <Route exact path={'/unauthorized'}
                           component={asyncComponent(() => import('./containers/exception/UnauthorizedPage'))}/>
                    <Route component={asyncComponent(() => import('./containers/exception/NotFoundPage'))}/>
                </Switch>
            </ConnectedRouter>
        );
    }
}

PublicRoutes.propTypes = propTypes;

export default connect(null, null)(PublicRoutes);
