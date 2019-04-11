import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Weather = ({
                     weather,
                 }) => (
    <Fragment>
        <p>Cloud percentage: {weather.cloudPercentage}%</p>
        <p>Rain amount: {weather.rainAmount}</p>
        <p>Temperature: {weather.temperature} C</p>
    </Fragment>

);


Weather.propTypes = {
    weather: PropTypes.object.isRequired,
};


export default Weather;

