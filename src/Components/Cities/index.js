import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './index.scss';

const Cities = ({
                    citiesArray,
                    deleteFromListFunction,
                    refreshWeather,
                }) => (
    <div className="cities__list">
        {
            citiesArray.map(city => (
                <div key={city.id}
                     className="cities__single__city">
                    <div className='cities__single__city__inner'>
                        <div className="cities__single__city_weather">
                            {city.weather &&
                            <Fragment>
                                <p>Cloud percentage: {city.weather.cloudPercentage}</p>
                                <p>Rain amount: {city.weather.rainAmount}</p>
                                <p>Temperature: {city.weather.temperature}</p>
                            </Fragment>
                            }
                        </div>
                        <h3 className='text-center'>
                            {city.name}
                        </h3>
                        <div className="sigle__city_button">
                            <Button
                                action={() => deleteFromListFunction(city.id)}
                                textButton="Delete"
                                buttonClassName='bg_red'>
                            </Button>
                            <Button
                                action={() => refreshWeather(city)}
                                textButton="Refresh"
                                buttonClassName='bg_green'>
                            </Button>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
);


Cities.propTypes = {
    citiesArray: PropTypes.array.isRequired,
    refreshWeather: PropTypes.func,
    deleteFromListFunction: PropTypes.func,
};

Cities.defaultProps = {
    refreshWeather: () => {
    },
    deleteFromListFunction: () => {
    }
};


export default Cities;

