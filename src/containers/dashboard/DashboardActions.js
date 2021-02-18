import Backend, {showErrorNotification} from "../../components/helper/Backend";
import {_getAccessToken} from "../../components/auth/AuthActions";
import {toast} from 'react-toastify';

export function sendFeedback(feedback, recaptcha) {
    return dispatch => {
        dispatch({
            type: 'FORM_SEND_FEEDBACK_PROCESS'
        });

        return Backend.post('/ganesha/account/feedback', {feedback, recaptcha}, {
            onSuccess: function (response) {
                dispatch({
                    type: 'FORM_SEND_FEEDBACK_SUCCESS'
                });

                toast.success('Feedback sent')
            },
            onFailure: function (error) {
                dispatch({
                    type: 'FORM_SEND_FEEDBACK_FAILED'
                });
                showErrorNotification(error);
            }
        }, {
            'Authorization': _getAccessToken()
        }).then(response => {
            return response.status === 200;
        });
    }
}