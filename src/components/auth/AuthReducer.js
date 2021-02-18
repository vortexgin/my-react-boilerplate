const initialState = {
    isAuthenticated: false,
    formLoginProcess: false,
    activeUser: {
        name: "n/a"
    }
};

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case "FORM_LOGIN_PROCESS":
            return {...state, isAuthenticated: true, formLoginProcess: true};
        case "FORM_LOGIN_SUCCESS":
            return {...state, isAuthenticated: false, formLoginProcess: false};
        case "FORM_LOGIN_FAILED":
            return {...state, isAuthenticated: false, formLoginProcess: false};
        case "SET_ACTIVE_USER":
            return {...state, isAuthenticated: true, activeUser: action.payload.user};
        default:
            return state;
    }

}