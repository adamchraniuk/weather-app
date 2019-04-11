import React from 'react';
import PropTypes from 'prop-types';
import Weather from './weather';
import Button from '../Button';
import './index.scss';

const Cities = ({
                    citiesArray,
                    deleteFromListFunction,
                    refreshWeatherFunction,
                }) => (
    <div className="cities__list">
        {
            citiesArray.map(city => (
                <div key={city.id}
                     className="cities__single__city">
                    <div className='cities__single__city__inner'>
                        <h4>
                            {city.name}
                        </h4>
                        {city.weather &&
                        <div className="cities__single__city_weather">
                            <Weather weather={city.weather}/>
                        </div>
                        }
                        <div className="sigle__city_button">
                            <Button
                                action={() => deleteFromListFunction(city.id)}
                                iconClass="fas fa-minus-circle"
                                buttonClassName='bg_red'>
                            </Button>
                            <Button
                                action={() => refreshWeatherFunction(city)}
                                iconClass="fas fa-sync-alt"
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
    refreshWeatherFunction: PropTypes.func,
    deleteFromListFunction: PropTypes.func,
};

Cities.defaultProps = {
    refreshWeatherFunction: () => {
    },
    deleteFromListFunction: () => {
    }
};


export default Cities;

