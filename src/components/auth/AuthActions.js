import _ from 'lodash';
import {Cookies} from 'react-cookie';
import jwt_decode from "jwt-decode";
import Backend, {showErrorNotification} from "../helper/Backend";
import {Form} from "../helper/Form";
import {PAGE_DASHBOARD, PAGE_LOGIN, ROLE_MERCHANT} from "../../config/app";

export function loggedInUser(email, password, recaptcha) {
    return dispatch => {
        dispatch({
            type: 'FORM_LOGIN_PROCESS'
        });

        return Backend.post('/ganesha/account/login', {
            username: email,
            password,
            recaptcha
        }, {
            onSuccess: (response) => {
                const decoded = jwt_decode(response.data.data.token);
                if (!!decoded) {
                    _setAccessToken(response.data.data.token);

                    dispatch({
                        type: 'FORM_LOGIN_SUCCESS'
                    });

                    setTimeout(() => {
                        if (!Form.empty(_getRef()) && _getRef() !== window.location.href) {
                            window.location.href = _getRef();
                        } else {
                            window.location.href = PAGE_DASHBOARD;
                        }
                    }, 1000)
                } else {
                    dispatch({
                        type: 'FORM_LOGIN_FAILED'
                    });

                    _removeAccessToken();
                }
            },
            onFailure: function (error) {
                dispatch({
                    type: 'FORM_LOGIN_FAILED'
                });

                _removeAccessToken();

                showErrorNotification(error);
            }
        });
    }
}

export function validateToken() {
    return dispatch => {
        return Backend.get('/ganesha/account/me', {}, {
            onSuccess: function (response) {
                dispatch({
                    type: 'SET_ACTIVE_USER',
                    payload: {
                        user: response.data.data.user
                    }
                });
            },
            onFailure: function (error) {
                _recordLastPage();
                _removeAccessToken();
                window.location.href = PAGE_LOGIN;
            }
        }, {
            'Authorization': _getAccessToken()
        });
    };
}

function _setAccessToken(accessToken) {
    const cookie = new Cookies();
    cookie.set('_at', accessToken, {path: '/'});
}

export function _getAccessToken() {
    const cookie = new Cookies();
    return cookie.get('_at', {path: '/'});
}

export function _removeAccessToken() {
    const cookie = new Cookies();

    cookie.set('_at', '', {path: '/'});
    cookie.remove('_at', {path: '/'});
}

export function _recordLastPage() {
    const cookie = new Cookies();

    cookie.set('_ref', window.location.href, {path: '/'});
}

export function _getRef() {
    const cookie = new Cookies();
    return !Form.empty(cookie.get('_ref', {path: '/'})) ? cookie.get('_ref', {path: '/'}) : null;
}

export function isAuthFor(role) {
    const decoded = jwt_decode(_getAccessToken());
    if (!decoded) return false;
    if (_.isArray(role)) return !_.isEmpty(_.intersection(decoded.roles, role));

    return _.includes(decoded.roles, role);
}