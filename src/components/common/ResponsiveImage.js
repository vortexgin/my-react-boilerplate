import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';

const ResponsiveImage = (props) => {
    const {
        src,
        width,
        height,
        className,
        style
    } = props;

    return <div
        className={`img-responsive ${className}`}
        style={{
            ...style,
            backgroundImage: !_.isEmpty(src) ? `url("${src}")` : null,
            width,
            height
        }}></div>;
};

ResponsiveImage.defaultProps = {
    width: 100,
    height: 100,
    className: '',
    style: {}
};
ResponsiveImage.propTypes = {
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object
};

export default ResponsiveImage;
