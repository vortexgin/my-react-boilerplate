import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Footer = (props) => {
    const {
        backToTop,
        copyright,
        facebook,
        twitter,
        linkedin,
        youtube,
    } = props;

    return (
        <footer className="bg-dark text-light">
            {backToTop === true ? '<p className="float-right"><a href="#">Back to top</a></p>' : ''}
            <Row className="m-0 py-3">
                <Col xs="6">
                    <p className="mt-4 font-size-sm">{copyright}</p>
                </Col>
                <Col xs="6" className="text-right">
                    <strong>Social Media</strong>
                    <p>
                        {
                            facebook
                                ? <a href={facebook}>
                                    <FontAwesomeIcon className="text-white" icon={['fab', 'facebook-square']}/>
                                </a>
                                : ''
                        }
                        {
                            twitter
                                ? <a href={twitter}>
                                        <FontAwesomeIcon className="text-white ml-2" icon={['fab', 'twitter-square']}/>
                                </a>
                                : ''
                        }
                        {
                            linkedin
                                ? <a href={linkedin}>
                                    <FontAwesomeIcon className="text-white ml-2" icon={['fab', 'linkedin']}/>
                                </a>
                                : ''
                        }
                        {
                            youtube
                                ? <a href={youtube}>
                                    <FontAwesomeIcon className="text-white ml-2" icon={['fab', 'youtube-square']}/>
                                </a>
                                : ''
                        }
                    </p>
                </Col>
            </Row>
        </footer>
    );
}

Footer.propTypes = {
    backToTop: PropTypes.bool,
    copyright: PropTypes.string.isRequired,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    youtube: PropTypes.string
};
Footer.defaultProps = {
    copyright: '© ' + new Date().getFullYear() + ' Gin Vortex',
};

export default Footer;