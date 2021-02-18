import {_getAccessToken} from "../../../components/auth/AuthActions";
import Backend, {showErrorNotification} from "../../../components/helper/Backend";

export function getUsers(filter, sortBy, sortOrder, page, limit) {
    filter = filter ? filter : [];
    page = page && page > 0 ? page : 1;
    limit = limit ? limit : 20;
    const offset = (page * limit) - limit;

    let filters = {};
    filter.map(item => {
        return filters[item.id] = item.value;
    });

    const sort = (sortOrder === 'asc' ? '' : '-') + (sortBy ? sortBy : 'id')

    return dispatch => {
        return Backend.get('/ganesha/user', {
            filter: filters,
            sort: sort,
            page: page,
            offset: offset,
            limit: limit
        }, {
            onSuccess: function (response) {
                dispatch({
                    type: 'GRID_USER_STATUS_SUCCESS',
                    payload: response.data.data
                });
            },
            onFailure: function (error) {
                dispatch({
                    type: 'GRID_USER_STATUS_FAILURE'
                });
            }
        }, {
            'Authorization': _getAccessToken()
        });
    };
}

export function getUserAdmin(filter, sortBy, sortOrder, page, limit) {
    filter = filter ? filter : [];
    page = page && page > 0 ? page : 1;
    limit = limit ? limit : 20;
    const offset = (page * limit) - limit;

    let filters = {};
    filter.map(item => {
        return filters[item.id] = item.value;
    });

    const sort = (sortOrder === 'asc' ? '' : '-') + (sortBy ? sortBy : 'id')

    return dispatch => {
        return Backend.get('/ganesha/user', {
            filter: {...filters, isAdmin: true},
            sort: sort,
            page: page,
            offset: offset,
            limit: limit
        }, {
            onSuccess: function (response) {
                dispatch({
                    type: 'GRID_USER_ADMIN_STATUS_SUCCESS',
                    payload: response.data.data
                });
            },
            onFailure: function (error) {
                dispatch({
                    type: 'GRID_USER_ADMIN_STATUS_FAILURE'
                });
            }
        }, {
            'Authorization': _getAccessToken()
        });
    };
}

export function getUserMerchant(filter, sortBy, sortOrder, page, limit) {
    filter = filter ? filter : [];
    page = page && page > 0 ? page : 1;
    limit = limit ? limit : 20;
    const offset = (page * limit) - limit;

    let filters = {};
    filter.map(item => {
        return filters[item.id] = item.value;
    });

    const sort = (sortOrder === 'asc' ? '' : '-') + (sortBy ? sortBy : 'id')

    return dispatch => {
        return Backend.get('/ganesha/user', {
            filter: {...filters, isMerchant: true},
            sort: sort,
            page: page,
            offset: offset,
            limit: limit
        }, {
            onSuccess: function (response) {
                dispatch({
                    type: 'GRID_USER_MERCHANT_STATUS_SUCCESS',
                    payload: response.data.data
                });
            },
            onFailure: function (error) {
                dispatch({
                    type: 'GRID_USER_MERCHANT_STATUS_FAILURE'
                });
            }
        }, {
            'Authorization': _getAccessToken()
        });
    };
}

export function getUser(id) {
    return dispatch => {
        return Backend.get('/ganesha/user/' + id, {}, {
            onSuccess: function (response) {
                dispatch({
                    type: 'VIEW_USER_STATUS_SUCCESS',
                    payload: response.data.data
                });
            },
            onFailure: function (error) {
                dispatch({
                    type: 'VIEW_USER_STATUS_FAILURE'
                });
            }
        }, {
            'Authorization': _getAccessToken()
        });
    };
}

export function createUser(params, recaptcha) {
    return dispatch => {
        return Backend.post('/ganesha/user', {...params, recaptcha}, {
            onSuccess: function (response) {
                dispatch({
                    type: 'FORM_USER_SUCCESS',
                    payload: response.data.data
                });
            },
            onFailure: function (error) {
                dispatch({
                    type: 'FORM_USER_FAILURE',
                    payload: {
                        fields: error.response.data.fields
                    }
                });

                showErrorNotification(error);
            }
        }, {
            'Authorization': _getAccessToken()
        });
    };
}

export function importUser(params, recaptcha) {
    return dispatch => {
        return Backend.post(`/ganesha/user/import`, {...params, recaptcha}, {
            onSuccess: function (response) {
                dispatch({
                    type: 'FORM_USER_SUCCESS',
                    payload: response.data.data
                });
            },
            onFailure: function (error) {
                dispatch({
                    type: 'FORM_USER_FAILURE',
                });

                showErrorNotification(error);
            }
        }, {
            'Authorization': _getAccessToken()
        });
    };
}

export function updateUser(id, params, recaptcha) {
    return dispatch => {
        return Backend.put(`/ganesha/user/${id}`, {...params, recaptcha}, {
            onSuccess: function (response) {
                dispatch({
                    type: 'FORM_USER_SUCCESS',
                    payload: response.data.data
                });
            },
            onFailure: function (error) {
                dispatch({
                    type: 'FORM_USER_FAILURE',
                });

                showErrorNotification(error);
            }
        }, {
            'Authorization': _getAccessToken()
        });
    };
}

export function updateUserRole(id, role, recaptcha) {
    return dispatch => {
        return Backend.put(`/ganesha/user/${id}/role`, {role, recaptcha}, {
            onSuccess: function (response) {
                dispatch({
                    type: 'FORM_USER_SUCCESS',
                    payload: response.data.data
                });
            },
            onFailure: function (error) {
                dispatch({
                    type: 'FORM_USER_FAILURE',
                });

                showErrorNotification(error);
            }
        }, {
            'Authorization': _getAccessToken()
        });
    };
}

export function deleteUser(id, recaptcha) {
    return dispatch => {
        return Backend.delete(`/ganesha/user/${id}`, {recaptcha}, {
            onSuccess: function (response) {
                dispatch({
                    type: 'DELETE_USER_SUCCESS',
                });
            },
            onFailure: function (error) {
                dispatch({
                    type: 'DELETE_USER_FAILURE',
                });

                showErrorNotification(error);
            }
        }, {
            'Authorization': _getAccessToken()
        });
    };
}
