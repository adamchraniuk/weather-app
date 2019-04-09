import {
    fetchDataBegin,
    fetchDataSuccess,
    fetchDataFailure
} from '../index';
import {
    APP_HEADERS_GET,
    APP_AUTH
} from '../config';

export function fetchData() {
    return dispatch => {
        dispatch(fetchDataBegin());
        return fetch(APP_HEADERS_GET.cityList, {
            method: 'GET',
            headers: {
                "authorization": APP_AUTH,
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then(response => response.sort((a, b) => a.name.localeCompare(b.name)))
            .then((response) => dispatch(fetchDataSuccess(response)))
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    };
}
