import React from "react";
import PropType from 'prop-types';

const ChartLoader = (props) => {
    const {
        width,
        height,
        className
    } = props;

    return (
        <p className="text-center">
            <img src="/images/loading-chart.gif" className={className} style={{width, height}}/>
        </p>
    )
};

ChartLoader.propTypes = {
    width: PropType.oneOfType([PropType.number, PropType.string]),
    height: PropType.oneOfType([PropType.number, PropType.string]),
    className: PropType.string,
};
ChartLoader.defaultProps = {
    width: 200,
    height: 150,
};

export default ChartLoader;