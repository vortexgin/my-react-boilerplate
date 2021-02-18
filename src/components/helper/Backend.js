import axios from 'axios';
import _ from 'lodash';
import {BACKEND_ENDPOINT} from '../../config/app';
import {toast} from 'react-toastify';
import {Form} from './Form';

const Backend = {
    endpoint: BACKEND_ENDPOINT,
    allowMethod: ['post', 'get', 'put', 'delete'],
    request: function (method, url, params, callback, headers) {
        if (!Backend.allowMethod.includes(method)) {
            toast('Request method not allowed');
            return;
        }
        if (!url) {
            toast('Please specify url request');
            return;
        }
        if (callback.hasOwnProperty('beforeProcess') && !!callback.beforeProcess) {
            callback.beforeProcess();
        }
        return axios({
            method: method,
            url: Backend.endpoint + url,
            data: params ? params : {},
            headers: headers
                ? {...headers, 'Access-Control-Allow-Origin': window.location.origin}
                : {'Access-Control-Allow-Origin': window.location.origin},
        }).then(function (response) {
            if (callback.hasOwnProperty('onSuccess') && !!callback.onSuccess) {
                callback.onSuccess(response);
            }
            return response;
        }).catch(function (error) {
            if (callback.hasOwnProperty('onFailure') && !!callback.onFailure) {
                callback.onFailure(error);
            }
            return error;
        });
    },
    get: function (url, params, callback, headers) {
        const queryString = Object.keys(params).map(key => {
            if (params[key] instanceof Object) {
                return Object.keys(params[key]).map(index => `${key}[${index}]=${params[key][index]}`).join('&');
            }
            return `${key}=${params[key]}`;
        }).join('&');

        return Backend.request('get', url + '?' + queryString, {}, callback, headers)
    },
    post: function (url, params, callback, headers) {
        return Backend.request('post', url, Form.fromJson(params), callback, {
            ...headers,
            'Content-Type': 'multipart/form-data'
        })
    },
    put: function (url, params, callback, headers) {
        return Backend.request('post', url + '?_method=PUT', Form.fromJson(params), callback, {
            ...headers,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    },
    delete: function (url, params, callback, headers) {
        return Backend.request('delete', url, params, callback, headers)
    }
};

export function showErrorNotification(error) {
    if (!!error.response && !!error.response.data && !!error.response.data.message) {
        if (_.isObject(error.response.data.message)) {
            Object.keys(error.response.data.message).map((field) => {
                return toast.error(_.upperFirst(field) + ': ' + error.response.data.message[field]);
            });
        } else if (_.isString(error.response.data.message)) {
            toast.error(error.response.data.message);
        }
    } else {
        toast.error(error.message);
    }
}

export default Backend