const initialState = {
    formSendFeedbackProcess: false,
};

export default function DashboardReducer(state = initialState, action) {
    switch (action.type) {
        case "FORM_SEND_FEEDBACK_PROCESS":
            return {...state, formSendFeedbackProcess: true};
        case "FORM_SEND_FEEDBACK_SUCCESS":
            return {...state, formSendFeedbackProcess: false};
        case "FORM_SEND_FEEDBACK_FAILED":
            return {...state, formSendFeedbackProcess: false};

        default:
            return state;
    }

}