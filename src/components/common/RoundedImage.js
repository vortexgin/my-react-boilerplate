import React from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';

const RoundedImage = (props) => {
    const {
        src,
        component,
        width,
        height,
        className,
        style
    } = props;

    if (!_.isEmpty(src))
        return <div className={`img-responsive img-rounded ${className}`}
                    style={{...style, backgroundImage: `url("${src}")`, width, height}}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building"
                 className="svg-inline--fa fa-w-14 m-auto" role="img"/>
        </div>;
    else if (!_.isEmpty(component))
        return <div className={`img-responsive img-rounded ${className}`}
                    style={{...style, width, height}}>{component}</div>
    else
        return null;
};

RoundedImage.defaultProps = {
    width: 100,
    height: 100,
    className: '',
    style: {}
};
RoundedImage.propTypes = {
    src: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object
};

export default RoundedImage;
