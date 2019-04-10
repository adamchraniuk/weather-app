import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {APP_AUTH, APP_HEADERS_GET} from './Actions/config';
import {fetchData} from './Actions/AllCity';
import {APP_STATES} from "./config";
import PropTypes from 'prop-types';
import ReactAutocomplete from "react-autocomplete";
import Button from './Components/Button';
import Cities from './Components/Cities';
import {
    addChoosenCity,
    removeChoosenCity,
    updateCityWeather
} from './Actions';
import './Styles/index.scss';

class App extends Component {

    state = {
        pageState: APP_STATES.INIT,
        cityName: '',
        choosenCityId: 0,
    };

    componentDidMount() {
        if (this.props.cityList.length === 0) {
            this.props.dispatch(fetchData());
            this.setState({
                pageState: APP_STATES.LOADING
            });
        } else {
            this.setState({
                pageState: APP_STATES.RESULTS
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            loading,
            error,
            cityList
        } = this.props;

        if (prevProps.loading !== loading) {
            this.setState({
                pageState: APP_STATES.LOADING
            })
        }
        if (prevProps.cityList !== cityList && !loading) {
            this.setState({
                pageState: APP_STATES.RESULTS
            });
        }
        if (prevProps.error !== error && !loading) {
            this.setState({
                pageState: APP_STATES.ERROR
            });
        }
    }

    addNewCity = () => {
        for (let city of this.props.cityList) {
            if (this.state.cityName === city.name) {
                this.setState({
                    choosenCityId: city.id,
                    cityName: '',
                });
                fetch(APP_HEADERS_GET.weather + city.id, {
                    method: 'GET',
                    headers: {
                        "authorization": APP_AUTH,
                    }
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error!');
                    }
                }).then((response) => {
                    this.props.dispatch(addChoosenCity({
                        id: city.id,
                        name: city.name,
                        weather: response
                    }))
                }).catch(error => error)
            }
        }
    };

    removeOneCityFromWatchlist = (id) => {
        const {
            choosenCityArray,
            dispatch
        } = this.props;
        const newChoosenCityArray = choosenCityArray.filter((element, index) => {
            return choosenCityArray[index].id !== id
        });
        dispatch(removeChoosenCity(newChoosenCityArray))
    };

    refreshCityWeather = (cityObject) => {
        const {
            choosenCityArray,
            dispatch
        } = this.props;
        fetch(APP_HEADERS_GET.weather + cityObject.id, {
            method: 'GET',
            headers: {
                "authorization": APP_AUTH,
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error!');
            }
        }).then((response) => {
            cityObject.weather = response;
            dispatch(updateCityWeather(choosenCityArray))
        }).catch(error => error)
        
        // const test = {
        //     cloudPercentage: 'abc',
        //     rainAmount: 'abc',
        //     temperature: 'cda'
        // };

    };

    render() {
        const {
            pageState,
            cityName
        } = this.state;

        const {
            error,
            cityList,
            choosenCityArray
        } = this.props;

        return (
            <Fragment>
                <header>
                    <h1>
                        Weather app.
                    </h1>
                </header>
                {
                    pageState === APP_STATES.LOADING &&
                    <h2 className='text-center'>
                        App is loading, please wait.
                    </h2>
                }
                {
                    pageState === APP_STATES.RESULTS &&
                    <main>
                        <h2 className='text-center'>
                            Choose a new city and add to watchlist.
                        </h2>
                        <div className='input__container'>
                            <div className='add__city text-input'>
                                <ReactAutocomplete
                                    items={cityList}
                                    shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    getItemValue={item => item.name}
                                    inputProps={{
                                        placeholder: 'City Name',
                                        type: 'text',
                                        id: 'autocompleteInput'
                                    }}
                                    renderItem={(item, highlighted) =>
                                        <div
                                            className='auto__complete__menu'
                                            key={item.id}
                                            style={{
                                                backgroundColor: highlighted ? '#fff1bc' : 'white',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    }
                                    value={cityName}
                                    onChange={e => this.setState({
                                        cityName: e.target.value,
                                    })}
                                    onSelect={value => {
                                        this.setState({cityName: value});
                                    }}
                                />
                                <Button
                                    action={this.addNewCity}
                                    buttonClassName='auto__complete__button'
                                    textButton='Add'
                                />
                            </div>
                        </div>
                        {choosenCityArray.length > 0 &&
                        <div className="cities">
                            <h2 className='text-center'>
                                List of observed cities.
                            </h2>
                            <Cities
                                deleteFromListFunction={this.removeOneCityFromWatchlist}
                                refreshWeather={this.refreshCityWeather}
                                citiesArray={choosenCityArray}
                            />
                        </div>
                        }
                    </main>
                }
                {
                    pageState === APP_STATES.ERROR &&
                    <h2>
                        {error.message}
                    </h2>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    cityList: state.data,
    choosenCityArray: state.choosenCities,
    loading: state.loading,
    error: state.error,
});

App.propTypes = {
    cityList: PropTypes.array,
    choosenCityArray: PropTypes.array
};

App.defaultProps = {
    cityList: [],
    choosenCityArray: [],
};


export default connect(mapStateToProps)(App);
