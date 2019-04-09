import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchData} from './Actions/AllCity';
import Grid from '@material-ui/core/Grid';
import {APP_STATES} from "./config";
import PropTypes from 'prop-types';
import {addChoosenCity} from './Actions';
import ReactAutocomplete from "react-autocomplete";
import Button from './Components/Button';
import './Styles/index.scss';

class App extends Component {

    state = {
        pageState: APP_STATES.INIT,
        cityName: '',
        choosenCityId: 0,
    };

    componentDidMount() {
        this.props.dispatch(fetchData());
        this.setState({
            pageState: APP_STATES.LOADING
        })
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
                this.props.dispatch(addChoosenCity({
                    id: city.id,
                    name: city.name
                }))
            }
        }
    };

    render() {

        const {
            pageState,
            cityName
        } = this.state;

        return (
            <Fragment>
                <header>
                    <h1>
                        Weather app.
                    </h1>
                </header>
                <main>
                    <Grid
                        container={true}
                        alignContent={'center'}
                        justify={'center'}
                    >
                        {
                            pageState === APP_STATES.LOADING &&
                            <h2 className='text-center'>
                                App is loading, please wait.
                            </h2>
                        }
                        {
                            pageState === APP_STATES.RESULTS &&
                            <div className='add__city text-input'>
                                <ReactAutocomplete
                                    items={this.props.cityList}
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
                                                backgroundColor: highlighted ? '#fff1bc' : 'transparent',
                                                cursor: 'pointer'
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
                        }
                        {
                            pageState === APP_STATES.ERROR &&
                            <h2>
                                {this.props.error.message}
                            </h2>
                        }
                    </Grid>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    cityList: state.data,
    choosenCityId: state.choosenCities,
    loading: state.loading,
    error: state.error,
});

App.propTypes = {
    cityList: PropTypes.array
};

App.defaultProps = {
    cityList: [{id: 776069, name: "Bialystok"}]
};


export default connect(mapStateToProps)(App);
