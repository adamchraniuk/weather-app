import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchData} from './Actions/AllCity';
import Grid from '@material-ui/core/Grid';
import {APP_STATES} from "./config";
import PropTypes from 'prop-types';
import ReactAutocomplete from "react-autocomplete";
import './Styles/index.scss';

class App extends Component {

    state = {
        pageState: APP_STATES.INIT,
        value: ''
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

    render() {

        const {
            pageState,
            value
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
                                    open={(this.state.value.length >= 1)}
                                    inputProps={{
                                        placeholder: 'City Name',
                                        type: 'text'
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
                                    value={value}
                                    onChange={e => this.setState({value: e.target.value})}
                                    onSelect={value => this.setState({value})}
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
