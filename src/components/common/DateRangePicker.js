import React from "react";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker as BaseDateRangePicker} from "react-dates";

const DateRangePicker = (props) => {
    return <BaseDateRangePicker {...props} />
}

export default DateRangePicker;