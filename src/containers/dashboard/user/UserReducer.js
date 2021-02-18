const meta = {
    page: 1,
    limit: 20,
    total: 0,
    totalPage: 0,
};
const user = {
    id: null,
    username: null,
    email: null,
    name: null,
};
const initialState = {
    gridUserStatus: false,
    gridUser: [],
    metaUser: meta,
    gridUserAdminStatus: false,
    gridUserAdmin: [],
    metaUserAdmin: meta,
    gridUserMerchantStatus: false,
    gridUserMerchant: [],
    metaUserMerchant: meta,
    viewUserStatus: false,
    viewUser: user,
    formUserProcess: false,
    formUserErrors: {},
    formUser: user,
    deleteUserProcess: false,
};

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'GRID_USER_STATUS_PROCESS':
            return {...state, gridUserStatus: true, gridUser: initialState.gridUser, metaUser: initialState.metaUser};
        case 'GRID_USER_STATUS_SUCCESS':
            return {...state, gridUserStatus: false, gridUser: action.payload.users, metaUser: action.payload.meta};
        case 'GRID_USER_STATUS_FAILURE':
            return {...state, gridUserStatus: false, gridUser: initialState.gridUser, metaUser: initialState.metaUser};

        case 'GRID_USER_ADMIN_STATUS_PROCESS':
            return {
                ...state,
                gridUserAdminStatus: true,
                gridUserAdmin: initialState.gridUserAdmin,
                metaUserAdmin: initialState.metaUserAdmin
            };
        case 'GRID_USER_ADMIN_STATUS_SUCCESS':
            return {
                ...state,
                gridUserAdminStatus: false,
                gridUserAdmin: action.payload.users,
                metaUserAdmin: action.payload.meta
            };
        case 'GRID_USER_ADMIN_STATUS_FAILURE':
            return {
                ...state,
                gridUserAdminStatus: false,
                gridUserAdmin: initialState.gridUserAdmin,
                metaUserAdmin: initialState.metaUserAdmin
            };

        case 'GRID_USER_MERCHANT_STATUS_PROCESS':
            return {
                ...state,
                gridUserMerchantStatus: true,
                gridUserMerchant: initialState.gridUserMerchant,
                metaUserMerchant: initialState.metaUserMerchant
            };
        case 'GRID_USER_MERCHANT_STATUS_SUCCESS':
            return {
                ...state,
                gridUserMerchantStatus: false,
                gridUserMerchant: action.payload.users,
                metaUserMerchant: action.payload.meta
            };
        case 'GRID_USER_MERCHANT_STATUS_FAILURE':
            return {
                ...state,
                gridUserMerchantStatus: false,
                gridUserMerchant: initialState.gridUserMerchant,
                metaUserMerchant: initialState.metaUserMerchant
            };

        case 'VIEW_USER_STATUS_PROCESS':
            return {...state, viewUserStatus: true, viewUser: initialState.viewUser};
        case 'VIEW_USER_STATUS_SUCCESS':
            return {...state, viewUserStatus: false, viewUser: action.payload};
        case 'VIEW_USER_STATUS_FAILURE':
            return {...state, viewUserStatus: false, viewUser: initialState.viewUser};

        case 'FORM_USER_PROCESS':
            return {...state, formUserProcess: true, formUser: initialState.formUser};
        case 'FORM_USER_SUCCESS':
            return {...state, formUserProcess: false, formUser: action.payload};
        case 'FORM_USER_FAILURE':
            return {...state, formUserProcess: false, formUser: initialState.formUser};

        case 'DELETE_USER_PROCESS':
            return {...state, deleteUserProcess: true};
        case 'DELETE_USER_SUCCESS':
            return {...state, deleteUserProcess: false};
        case 'DELETE_USER_FAILURE':
            return {...state, deleteUserProcess: false};

        default:
            return state;
    }

}