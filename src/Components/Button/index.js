import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Button = ({
                    buttonClassName,
                    action,
                    iconClass
                }) => (
    <button
        className={buttonClassName}
        onClick={() => action()}>
        <i className={iconClass}/>
    </button>
);


Button.propTypes = {
    buttonClassName: PropTypes.string,
    action: PropTypes.func.isRequired,
    textButton: PropTypes.string,
};

Button.defaultProps = {
    buttonClassName: 'default__button',
    iconClass: 'fas fa-plus-circle'
};


export default Button;

