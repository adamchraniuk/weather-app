import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Button = ({
                    buttonClassName,
                    action,
                    textButton
                }) => (
    <button
        className={buttonClassName}
        onClick={() => action()}>
        {textButton}
    </button>
);


Button.propTypes = {
    buttonClassName: PropTypes.string,
    action: PropTypes.func.isRequired,
    textButton: PropTypes.string,
};

Button.defaultProps = {
    buttonClassName: 'default__button',
    textButton: 'Button'
};


export default Button;

