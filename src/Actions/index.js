import {
    FETCH_DATA_BEGIN,
    FETCH_DATA_SUCCESS,
    ADD_NEW_CHOOSEN_CITY,
    FETCH_DATA_FAILURE,
    REMOVE_CHOOSEN_CITY,
    UPDATE_WEATHER
} from "./actionsTypes";

export const fetchDataBegin = () => ({
    type: FETCH_DATA_BEGIN
});

export const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: {data},
});

export const fetchDataFailure = error => ({
    type: FETCH_DATA_FAILURE,
    payload: {error}
});

export const addChoosenCity = (data) => ({
    type: ADD_NEW_CHOOSEN_CITY,
    payload: {data}
});

export const updateCityWeather = (data) => ({
    type: UPDATE_WEATHER,
    payload: {data}
});

export const removeChoosenCity = (data) => ({
    type: REMOVE_CHOOSEN_CITY,
    payload: data
});