import React from "react";
import PropType from 'prop-types';

const DataLoader = (props) => {
    const {
        width,
        height,
        className,
    } = props;

    return (
        <p className="text-center">
            <img src="/images/loading-data.gif" className={className} style={{width, height}}/>
        </p>
    )
};

DataLoader.propTypes = {
    width: PropType.oneOfType([PropType.number, PropType.string]),
    height: PropType.oneOfType([PropType.number, PropType.string]),
    className: PropType.string,
};
DataLoader.defaultProps = {
    width: 200,
    height: 150,
};

export default DataLoader;