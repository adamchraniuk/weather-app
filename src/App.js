import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {fetchData} from './Actions/AllCity';
import './App.css';

class App extends Component {

    componentDidMount() {
     console.log(this.props.dispatch(fetchData()))
    }


    render() {
        return (
            <div className="App">
                TEST
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cityList: state.data,
    loading: state.loading,
    error: state.error,
});


export default connect(mapStateToProps)(App);
