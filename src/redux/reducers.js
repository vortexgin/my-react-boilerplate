import {reducer as formReducer} from 'redux-form';
import AuthReducer from "../components/auth/AuthReducer";
import DashboardReducer from "../containers/dashboard/DashboardReducer";
import UserReducer from "../containers/dashboard/user/UserReducer";

export default {
    AuthReducer,
    DashboardReducer,
    UserReducer,
    form: formReducer
}