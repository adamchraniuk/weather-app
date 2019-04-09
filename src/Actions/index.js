import {
    FETCH_DATA_BEGIN,
    FETCH_DATA_SUCCESS,
    ADD_NEW_DATA,
    FETCH_DATA_FAILURE,
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
    type: ADD_NEW_DATA,
    payload: {data}
});